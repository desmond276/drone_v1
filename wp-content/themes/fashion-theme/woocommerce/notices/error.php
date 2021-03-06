<?php

/**
 * Show messages
 *
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version     1.6.4
 */

if ( ! defined( 'ABSPATH' ) ) exit; 

if ( ! $messages ) return;
?>
<div class="row">
<div class="large-12 columns">
<div class="alert-box alert animated fadeIn">
	<ul class="error-messages">
		<?php foreach ( $messages as $message ) : ?>
			<li><?php echo wp_kses_post( $message ); ?></li>
		<?php endforeach; ?>
	</ul>
</div>
</div>
</div>