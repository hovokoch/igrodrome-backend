
module.exports = {
    location_decimal_length: 11,
    location_decimal_length_after_dot: 6,
    uploads: {
        game_images: "games"
    },
    image_sizes: {
        original: {
            name: 'original'
        },
        small: {
            name: 'small',
            width: 50, // 50
            height: 50, // 50
        },
        medium: {
            name: 'medium',
            width: 480, // 480
            height: 320, // 320
        },
        large: {
            name: 'large',
            width: 720, // 720
            height: 480, // 480
        }
    },
    user_email_token_limit: 3, // 3
    image_name_length: 20, // 20
    image_max_size: 28, // 5-28 MB
    auth_providers: [
        'google', // by default
        'twitter',
    ],
    client_devices: [
        'web',
        // 'android',
        // 'ios',
    ],
    seed: {
        game: {
            random_images_count: 10, // depends on games images count in "public/seed-images/games/game-*.*"
        },
    },
};
