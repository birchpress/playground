<?php

birch_ns( 'brithoncrm.common.datatables.model', function( $ns ) {

        global $brithoncrm;

        $ns->init = function() use ( $ns ) {
            add_action( 'init', array( $ns, 'wp_init' ) );
        };

        $ns->wp_init = function() use ( $ns, $brithoncrm ) {
            global $birchpress;

            if ( is_main_site() ) {
                add_action( 'wp_ajax_load_data', array( $ns, 'get_json_data' ) );
            }
        };

        $ns->get_json_data = function() use ( $ns, $brithoncrm ) {
            $data = '';

            if ( !isset( $_POST['draw'] ) || !isset( $_POST['start'] ) || !isset( $_POST['length'] ) ) {
                die( '{"data": {}}' );
            }

            $draw = $_POST['draw'];
            $start = $_POST['start'];
            $length = $_POST['length'];

            $data = $ns->fetch_json_data();

            $data_obj = json_decode( $data );
            $data_arr = $data_obj->data;
            $total = count( $data_arr );
            $total_filtered = $total;

            if ( $start < $total ) {
                $result = new stdClass();

                // Global search
                $search = $_POST['search'];
                $columns_info = $_POST['columns'];
                if ( $search['value'] ) {
                    $searchable_cols = array();
                    $search_result = array();
                    foreach ( $columns_info as $id => $val ) {
                        if ( $val['searchable'] === 'true' ) {
                            array_push( $searchable_cols, $id );
                        }
                    }
                    foreach ( $searchable_cols as $id ) {
                        $search_result = array_merge( $search_result, $ns->search( $data_arr, $search['value'], $id ) );
                    }
                    $data_arr = $search_result;
                    $total_filtered = count( $data_arr );
                }

                $part = array_slice( $data_arr, $start, $length );

                foreach ( $_POST['order'] as $order ) {
                    $asc = ( $order['dir'] === 'asc' )?true:false;
                    $comparator = function() use ( $ns, $order, $asc ) {
                        $applied_args = func_get_args();
                        $info = array(
                            'id' => $order['column'],
                            'asc' => $asc
                        );
                        return call_user_func_array( array( $ns, 'column_comparater' ), array_merge( $applied_args, $info, func_get_args() ) );
                    };
                    usort( $part, $comparator );
                }

                $result->data = $part;
                $result->draw = $draw;
                $result->recordsTotal = $total;
                $result->recordsFiltered = $total_filtered;
                die( json_encode( $result ) );
            } else {
                die( '{"data": {}}' );
            }
        };

        $ns->fetch_json_data = function() use ( $ns, $brithoncrm ) {
            static $content = '';

            if ( !$content ) {
                $filepath = $brithoncrm->plugin_url() . '/modules/common/model/datatables/data.json';
                $file = fopen( $filepath, 'r' );
                if ( $file ) {
                    while ( !feof( $file ) ) {
                        $content .= fread( $file, 100 );
                    }
                } else {
                    $content = '{"data": {}}';
                }
            }
            return $content;
        };

        $ns->column_comparater = function( $element1, $element2, $id, $asc = true ) use ( $ns ) {
            // Try converting number first
            if ( preg_match( '/^[0-9]+$/', $element1[$id] ) && preg_match( '/^[0-9]+$/', $element2[$id] ) ) {
                $num1 = intval( $element1[$id] );
                $num2 = intval( $element2[$id] );
                return $asc ? ( $num1 - $num2 ) : ( $num2 - $num1 );
            } else {
                $currency = 'USD';
                $format = numfmt_create( 'en_US', NumberFormatter::CURRENCY );
                $num1 = numfmt_parse_currency( $format, $element1[$id], $currency );
                $num2 = numfmt_parse_currency( $format, $element2[$id], $currency );
                if ( $num1 && $num2 ) {
                    return $asc ? ( $num1 - $num2 ) : ( $num2 - $num1 );
                }
            }
            if ( $asc ) {
                return strcmp( $element1[$id], $element2[$id] );
            } else {
                return strcmp( $element2[$id], $element1[$id] );
            }
        };

        $ns->search = function( $data, $pattern, $col_id ) use ( $ns ) {
            // This is a very simple searching method. Just for demo
            $result = array();
            foreach ( $data as $item ) {
                if ( stripos( $item[$col_id], $pattern ) !== false ) {
                    array_push( $result, $item );
                }
            }
            return $result;
        };

        $ns->return_err_msg = function( $msg, $error = 'Error' ) use ( $ns ) {
            die( json_encode( array(
                        'error' => $error,
                        'message' => $msg,
                    ) ) );
        };

    } );
