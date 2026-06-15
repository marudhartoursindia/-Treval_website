<?php
/**
 * Plugin Name: Headless Travel CMS Extender
 * Description: Registers Custom Post Types (Packages, Destinations, Testimonials, FAQs) and exposes meta fields to the WP REST API for a Headless Next.js frontend.
 * Version: 1.0.0
 * Author: Premium Full-Stack Architect
 */

if (!defined('ABSPATH')) {
    exit;
}

// 1. Register Custom Post Types
function htc_register_post_types() {
    // Destinations
    register_post_type('destination', [
        'labels' => [
            'name' => __('Destinations'),
            'singular_name' => __('Destination'),
            'add_new_item' => __('Add New Destination'),
            'edit_item' => __('Edit Destination'),
        ],
        'public' => true,
        'has_archive' => true,
        'show_in_rest' => true,
        'supports' => ['title', 'editor', 'thumbnail', 'excerpt'],
        'menu_icon' => 'dashicons-location-alt',
    ]);

    // Travel Packages
    register_post_type('travel-package', [
        'labels' => [
            'name' => __('Travel Packages'),
            'singular_name' => __('Travel Package'),
            'add_new_item' => __('Add New Package'),
            'edit_item' => __('Edit Package'),
        ],
        'public' => true,
        'has_archive' => true,
        'show_in_rest' => true,
        'supports' => ['title', 'editor', 'thumbnail', 'excerpt'],
        'menu_icon' => 'dashicons-palmtree',
    ]);

    // Testimonials
    register_post_type('testimonial', [
        'labels' => [
            'name' => __('Testimonials'),
            'singular_name' => __('Testimonial'),
            'add_new_item' => __('Add New Testimonial'),
        ],
        'public' => true,
        'show_in_rest' => true,
        'supports' => ['title', 'editor', 'thumbnail'],
        'menu_icon' => 'dashicons-testimonial',
    ]);

    // FAQs
    register_post_type('faq', [
        'labels' => [
            'name' => __('FAQs'),
            'singular_name' => __('FAQ'),
            'add_new_item' => __('Add New FAQ'),
        ],
        'public' => true,
        'show_in_rest' => true,
        'supports' => ['title'],
        'menu_icon' => 'dashicons-editor-help',
    ]);
}
add_action('init', 'htc_register_post_types');

// 2. Register Custom Meta Fields in REST API
add_action('rest_api_init', 'htc_register_rest_fields');

function htc_register_rest_fields() {
    // --- TRAVEL PACKAGE REST FIELDS ---
    register_rest_field('travel-package', 'meta', [
        'get_callback' => function($post_array) {
            $post_id = $post_array['id'];
            return [
                'duration' => get_post_meta($post_id, '_tp_duration', true),
                'price' => (float)get_post_meta($post_id, '_tp_price', true),
                'discount_price' => (float)get_post_meta($post_id, '_tp_discount_price', true),
                'highlights' => array_filter(array_map('trim', explode("\n", get_post_meta($post_id, '_tp_highlights', true)))),
                'overview' => get_post_meta($post_id, '_tp_overview', true),
                'day_wise_itinerary' => json_decode(get_post_meta($post_id, '_tp_itinerary', true), true) ?: [],
                'included_services' => array_filter(array_map('trim', explode("\n", get_post_meta($post_id, '_tp_included', true)))),
                'excluded_services' => array_filter(array_map('trim', explode("\n", get_post_meta($post_id, '_tp_excluded', true)))),
                'hotel_information' => get_post_meta($post_id, '_tp_hotel_info', true),
                'transportation_information' => get_post_meta($post_id, '_tp_transport_info', true),
                'faq' => json_decode(get_post_meta($post_id, '_tp_faq', true), true) ?: [],
                'map_location' => get_post_meta($post_id, '_tp_map_location', true),
                'booking_cta' => get_post_meta($post_id, '_tp_booking_cta', true),
                'gallery_images' => array_filter(array_map('trim', explode("\n", get_post_meta($post_id, '_tp_gallery', true)))),
                'destination_id' => (int)get_post_meta($post_id, '_tp_destination', true),
                'seo_title' => get_post_meta($post_id, '_tp_seo_title', true),
                'seo_description' => get_post_meta($post_id, '_tp_seo_description', true),
            ];
        },
        'update_callback' => null,
        'schema' => null,
    ]);

    // --- DESTINATION REST FIELDS ---
    register_rest_field('destination', 'meta', [
        'get_callback' => function($post_array) {
            $post_id = $post_array['id'];
            return [
                'gallery' => array_filter(array_map('trim', explode("\n", get_post_meta($post_id, '_dest_gallery', true)))),
                'popular_attractions' => array_filter(array_map('trim', explode("\n", get_post_meta($post_id, '_dest_attractions', true)))),
                'best_time_to_visit' => get_post_meta($post_id, '_dest_best_time', true),
                'travel_tips' => array_filter(array_map('trim', explode("\n", get_post_meta($post_id, '_dest_tips', true)))),
            ];
        },
        'update_callback' => null,
        'schema' => null,
    ]);

    // --- TESTIMONIAL REST FIELDS ---
    register_rest_field('testimonial', 'meta', [
        'get_callback' => function($post_array) {
            $post_id = $post_array['id'];
            return [
                'rating' => (int)get_post_meta($post_id, '_test_rating', true) ?: 5,
                'location' => get_post_meta($post_id, '_test_location', true),
                'photo' => get_post_meta($post_id, '_test_photo', true),
            ];
        },
        'update_callback' => null,
        'schema' => null,
    ]);

    // --- FAQ REST FIELDS ---
    register_rest_field('faq', 'meta', [
        'get_callback' => function($post_array) {
            $post_id = $post_array['id'];
            return [
                'answer' => get_post_meta($post_id, '_faq_answer', true),
                'category' => get_post_meta($post_id, '_faq_category', true) ?: 'General',
            ];
        },
        'update_callback' => null,
        'schema' => null,
    ]);
}

// 3. Add Custom Meta Boxes for Travel Packages in WP Admin
function htc_add_custom_metaboxes() {
    add_meta_box('tp_details', 'Travel Package Custom Settings', 'htc_render_tp_metabox', 'travel-package', 'normal', 'high');
}
add_action('add_meta_boxes', 'htc_add_custom_metaboxes');

function htc_render_tp_metabox($post) {
    // Retrieve existing meta values
    $duration = get_post_meta($post->ID, '_tp_duration', true);
    $price = get_post_meta($post->ID, '_tp_price', true);
    $discount_price = get_post_meta($post->ID, '_tp_discount_price', true);
    $highlights = get_post_meta($post->ID, '_tp_highlights', true);
    $overview = get_post_meta($post->ID, '_tp_overview', true);
    $itinerary = get_post_meta($post->ID, '_tp_itinerary', true);
    $included = get_post_meta($post->ID, '_tp_included', true);
    $excluded = get_post_meta($post->ID, '_tp_excluded', true);
    $hotel_info = get_post_meta($post->ID, '_tp_hotel_info', true);
    $transport_info = get_post_meta($post->ID, '_tp_transport_info', true);
    $faq = get_post_meta($post->ID, '_tp_faq', true);
    $map_location = get_post_meta($post->ID, '_tp_map_location', true);
    $booking_cta = get_post_meta($post->ID, '_tp_booking_cta', true);
    $gallery = get_post_meta($post->ID, '_tp_gallery', true);
    $destination = get_post_meta($post->ID, '_tp_destination', true);
    $seo_title = get_post_meta($post->ID, '_tp_seo_title', true);
    $seo_description = get_post_meta($post->ID, '_tp_seo_description', true);

    wp_nonce_field('htc_save_package_meta', 'htc_package_nonce');
    ?>
    <style>
        .htc-form-row { margin-bottom: 15px; }
        .htc-form-row label { display: block; font-weight: bold; margin-bottom: 5px; }
        .htc-form-row input[type="text"], .htc-form-row input[type="number"], .htc-form-row textarea, .htc-form-row select { width: 100%; max-width: 600px; padding: 8px; }
        .htc-form-row p.description { font-style: italic; color: #666; margin-top: 4px; }
    </style>
    <div class="htc-form-row">
        <label for="tp_duration">Duration</label>
        <input type="text" id="tp_duration" name="tp_duration" value="<?php echo esc_attr($duration); ?>" placeholder="e.g. 5 Days / 4 Nights" />
    </div>
    <div class="htc-form-row">
        <label for="tp_price">Price ($)</label>
        <input type="number" step="0.01" id="tp_price" name="tp_price" value="<?php echo esc_attr($price); ?>" />
    </div>
    <div class="htc-form-row">
        <label for="tp_discount_price">Discount/Promo Price ($)</label>
        <input type="number" step="0.01" id="tp_discount_price" name="tp_discount_price" value="<?php echo esc_attr($discount_price); ?>" />
    </div>
    <div class="htc-form-row">
        <label for="tp_destination">Associated Destination</label>
        <select id="tp_destination" name="tp_destination">
            <option value="">-- Select Destination --</option>
            <?php
            $destinations = get_posts(['post_type' => 'destination', 'numberposts' => -1]);
            foreach ($destinations as $dest) {
                $selected = ($dest->ID == $destination) ? 'selected' : '';
                echo '<option value="' . esc_attr($dest->ID) . '" ' . $selected . '>' . esc_html($dest->post_title) . '</option>';
            }
            ?>
        </select>
    </div>
    <div class="htc-form-row">
        <label for="tp_highlights">Highlights (one per line)</label>
        <textarea id="tp_highlights" name="tp_highlights" rows="4"><?php echo esc_textarea($highlights); ?></textarea>
    </div>
    <div class="htc-form-row">
        <label for="tp_overview">Package Overview</label>
        <textarea id="tp_overview" name="tp_overview" rows="4"><?php echo esc_textarea($overview); ?></textarea>
    </div>
    <div class="htc-form-row">
        <label for="tp_itinerary">Day-wise Itinerary (JSON array: [{"day":1,"title":"Arrival","description":"..."},...])</label>
        <textarea id="tp_itinerary" name="tp_itinerary" rows="6"><?php echo esc_textarea($itinerary); ?></textarea>
        <p class="description">Input valid JSON array formatted day wise.</p>
    </div>
    <div class="htc-form-row">
        <label for="tp_included">Included Services (one per line)</label>
        <textarea id="tp_included" name="tp_included" rows="4"><?php echo esc_textarea($included); ?></textarea>
    </div>
    <div class="htc-form-row">
        <label for="tp_excluded">Excluded Services (one per line)</label>
        <textarea id="tp_excluded" name="tp_excluded" rows="4"><?php echo esc_textarea($excluded); ?></textarea>
    </div>
    <div class="htc-form-row">
        <label for="tp_hotel_info">Hotel Accommodation Info</label>
        <textarea id="tp_hotel_info" name="tp_hotel_info" rows="3"><?php echo esc_textarea($hotel_info); ?></textarea>
    </div>
    <div class="htc-form-row">
        <label for="tp_transport_info">Transportation Details</label>
        <textarea id="tp_transport_info" name="tp_transport_info" rows="3"><?php echo esc_textarea($transport_info); ?></textarea>
    </div>
    <div class="htc-form-row">
        <label for="tp_faq">Package FAQs (JSON array: [{"question":"...","answer":"..."},...])</label>
        <textarea id="tp_faq" name="tp_faq" rows="4"><?php echo esc_textarea($faq); ?></textarea>
    </div>
    <div class="htc-form-row">
        <label for="tp_map_location">Google Map Embed Link / Coords</label>
        <input type="text" id="tp_map_location" name="tp_map_location" value="<?php echo esc_attr($map_location); ?>" />
    </div>
    <div class="htc-form-row">
        <label for="tp_booking_cta">Custom Booking CTA Button Text</label>
        <input type="text" id="tp_booking_cta" name="tp_booking_cta" value="<?php echo esc_attr($booking_cta); ?>" placeholder="e.g. Book Luxury Package Now" />
    </div>
    <div class="htc-form-row">
        <label for="tp_gallery">Gallery Images (Image URLs, one per line)</label>
        <textarea id="tp_gallery" name="tp_gallery" rows="4"><?php echo esc_textarea($gallery); ?></textarea>
    </div>
    <hr />
    <h3>SEO Settings</h3>
    <div class="htc-form-row">
        <label for="tp_seo_title">SEO Title Override</label>
        <input type="text" id="tp_seo_title" name="tp_seo_title" value="<?php echo esc_attr($seo_title); ?>" />
    </div>
    <div class="htc-form-row">
        <label for="tp_seo_description">SEO Meta Description</label>
        <textarea id="tp_seo_description" name="tp_seo_description" rows="2"><?php echo esc_textarea($seo_description); ?></textarea>
    </div>
    <?php
}

// 4. Save Package Metadata
function htc_save_package_metadata($post_id) {
    if (!isset($_POST['htc_package_nonce']) || !wp_verify_nonce($_POST['htc_package_nonce'], 'htc_save_package_meta')) {
        return;
    }
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    $fields = [
        'tp_duration' => '_tp_duration',
        'tp_price' => '_tp_price',
        'tp_discount_price' => '_tp_discount_price',
        'tp_highlights' => '_tp_highlights',
        'tp_overview' => '_tp_overview',
        'tp_itinerary' => '_tp_itinerary',
        'tp_included' => '_tp_included',
        'tp_excluded' => '_tp_excluded',
        'tp_hotel_info' => '_tp_hotel_info',
        'tp_transport_info' => '_tp_transport_info',
        'tp_faq' => '_tp_faq',
        'tp_map_location' => '_tp_map_location',
        'tp_booking_cta' => '_tp_booking_cta',
        'tp_gallery' => '_tp_gallery',
        'tp_destination' => '_tp_destination',
        'tp_seo_title' => '_tp_seo_title',
        'tp_seo_description' => '_tp_seo_description',
    ];

    foreach ($fields as $key => $meta_key) {
        if (isset($_POST[$key])) {
            update_post_meta($post_id, $meta_key, $_POST[$key]);
        }
    }
}
add_action('save_post', 'htc_save_package_metadata');
