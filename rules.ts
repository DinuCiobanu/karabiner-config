import fs from "fs";
import { KarabinerRules } from "./types";
import { createHyperSubLayers, app, open, window, shell } from "./utils";

const rules: KarabinerRules[] = [
  // Define the Hyper key itself
  {
    description: "Hyper Key (⌃⌥⇧⌘)",
    manipulators: [
      {
        description: "Caps Lock -> Hyper Key",
        from: {
          key_code: "caps_lock",
          modifiers: {
            optional: ["any"],
          },
        },
        to: [
          {
            set_variable: {
              name: "hyper",
              value: 1,
            },
          },
        ],
        to_after_key_up: [
          {
            set_variable: {
              name: "hyper",
              value: 0,
            },
          },
        ],
        to_if_alone: [
          {
            key_code: "escape",
          },
        ],
        type: "basic",
      },
      //      {
      //        type: "basic",
      //        description: "Disable CMD + Tab to force Hyper Key usage",
      //        from: {
      //          key_code: "tab",
      //          modifiers: {
      //            mandatory: ["left_command"],
      //          },
      //        },
      //        to: [
      //          {
      //            key_code: "tab",
      //          },
      //        ],
      //      },
    ],
  },
  ...createHyperSubLayers({
    spacebar: app("Terminal"),
    f: app("Alfred 5"),
    s: {
      description: "Option",
      to: [
        {
          key_code: "left_option",
        },
      ],
    },
    d: {
      description: "Command",
      to: [
        {
          key_code: "left_command",
        },
      ],
    },
    e: {
      description: "Window: Next Tab",
      to: [
        {
          key_code: "close_bracket",
          modifiers: ["right_command", "right_shift"],
        },
      ],
    },
    w: {
      description: "Run: homerow app",
      to: [
        {
          key_code: "spacebar",
          modifiers: ["right_option"],
        },
      ],
    },
    v: {
      description: "Run: alfred clipboars manager",
      to: [
        {
          key_code: "v",
          modifiers: ["right_command", "right_option"],
        },
      ],
    },
    h: {
      to: [{ key_code: "left_arrow" }],
    },
    j: {
      to: [{ key_code: "down_arrow" }],
    },
    k: {
      to: [{ key_code: "up_arrow" }],
    },
    l: {
      to: [{ key_code: "right_arrow" }],
    },
    semicolon: {
      to: [
        {
          key_code: "return_or_enter",
        },
      ],
    },
    quote: {
      to: [
        {
          key_code: "delete_or_backspace",
        },
      ],
    },
    backslash: {
      to: [
        {
          key_code: "delete_forward",
        },
      ],
    },
    u: {
      to: [
        {
          key_code: "z",
          modifiers: ["right_command"],
        },
      ],
    },
    slash: {
      to: [
        {
          key_code: "slash",
          modifiers: ["left_shift"],
        },
      ],
    },
    // w = "Window"
    z: {
      semicolon: {
        description: "Window: Hide",
        to: [
          {
            key_code: "h",
            modifiers: ["right_command"],
          },
        ],
      },
      y: {
        description: "Window: Prev window",
        to: [
          {
            key_code: "grave_accent_and_tilde",
            modifiers: ["right_command", "left_shift"],
          },
        ],
      },
      o: {
        description: "Window: Next window",
        to: [
          {
            key_code: "grave_accent_and_tilde",
            modifiers: ["right_command"],
          },
        ],
      },
      k: window("top-half"),
      j: window("bottomÔ-half"),
      h: window("left-half"),
      l: window("right-half"),
      f: window("maximize"),
      n: {
        to: [{ key_code: "j", modifiers: ["right_command", "right_shift"] }],
      },
      // i: {
      //   description: "Window: Next Tab",
      //   to: [
      //     {
      //       key_code: "tab",
      //       modifiers: ["right_control"],
      //     },
      //   ],
      // },
      // n: {
      //   description: "Window: Next Window",
      //   to: [
      //     {
      //       key_code: "grave_accent_and_tilde",
      //       modifiers: ["right_command"],
      //     },
      //   ],
      // },
      // b: {
      //   description: "Window: Back",
      //   to: [
      //     {
      //       key_code: "open_bracket",
      //       modifiers: ["right_command"],
      //     },
      //   ],
      // },
      // // Note: No literal connection. Both f and n are already taken.
      // m: {
      //   description: "Window: Forward",
      //   to: [
      //     {
      //       key_code: "close_bracket",
      //       modifiers: ["right_command"],
      //     },
      //   ],
      // },
    },

    // s = "System"
    // x: {
    //   j: {
    //     to: [
    //       {
    //         key_code: "volume_decrement",
    //       },
    //     ],
    //   },
    //   k: {
    //     to: [
    //       {
    //         key_code: "volume_increment",
    //       },
    //     ],
    //   },

    //   i: {
    //     to: [
    //       {
    //         key_code: "display_brightness_increment",
    //       },
    //     ],
    //   },
    //   u: {
    //     to: [
    //       {
    //         key_code: "display_brightness_decrement",
    //       },
    //     ],
    //   },
    //   l: {
    //     to: [
    //       {
    //         key_code: "q",
    //         modifiers: ["right_control", "right_command"],
    //       },
    //     ],
    //   },
    //   p: {
    //     to: [
    //       {
    //         key_code: "play_or_pause",
    //       },
    //     ],
    //   },

    //   // e: open(
    //   //   `raycast://extensions/thomas/elgato-key-light/toggle?launchType=background`
    //   // ),
    //   // // "D"o not disturb toggle
    //   // d: open(
    //   //   `raycast://extensions/yakitrak/do-not-disturb/toggle?launchType=background`
    //   // ),
    //   // // "T"heme
    //   // t: open(`raycast://extensions/raycast/system/toggle-system-appearance`),
    //   // c: open("raycast://extensions/raycast/system/open-camera"),
    //   // // 'v'oice
    //   // v: {
    //   //   to: [
    //   //     {
    //   //       key_code: "spacebar",
    //   //       modifiers: ["left_option"],
    //   //     },
    //   //   ],
    //   // },
    // },

    // v = "moVe" which isn't "m" because we want it to be on the left hand
    // so that hjkl work like they do in vim
    // d: {
    //   // h: {
    //   //   to: [{ key_code: "left_arrow" }],
    //   // },
    //   // j: {
    //   //   to: [{ key_code: "down_arrow" }],
    //   // },
    //   // k: {
    //   //   to: [{ key_code: "up_arrow" }],
    //   // },
    //   // l: {
    //   //   to: [{ key_code: "right_arrow" }],
    //   // },
    //   // Magicmove via homerow.app
    //   // m: {
    //   //   to: [{ key_code: "j", modifiers: ["right_command", "right_shift"] }],
    //   // },
    //   // // Scroll mode via homerow.app
    //   // s: {
    //   //   to: [{ key_code: "j", modifiers: ["right_control"] }],
    //   // },
    //   // d: {
    //   //   to: [{ key_code: "d", modifiers: ["right_shift", "right_command"] }],
    //   // },
    //   // u: {
    //   //   to: [{ key_code: "page_down" }],
    //   // },
    //   // i: {
    //   //   to: [{ key_code: "page_up" }],
    //   // },
    // },
  }),
];
let result = JSON.stringify(
  {
    global: {
      show_in_menu_bar: false,
    },
    profiles: [
      {
        name: "HyperKey",
        virtual_hid_keyboard: { keyboard_type_v2: "ansi" },
        complex_modifications: {
          rules,
        },
      },
    ],
  },
  null,
  2
);

fs.writeFileSync("karabiner.json", result);
fs.writeFileSync("/Users/dinu/.config/karabiner/karabiner.json", result);
