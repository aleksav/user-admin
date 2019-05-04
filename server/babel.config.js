module.exports = function (api) {
    api.cache(true);

    const presets = [
        [
            "@babel/env", {
                targets: {
                    node: "8"
                }
            }
        ]
    ];
    const plugins = [
        "@babel/plugin-proposal-export-default-from"
    ];

    return {
        presets,
        plugins
    };
}