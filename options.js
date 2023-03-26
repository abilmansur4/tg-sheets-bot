module.exports = {
  //     problemOptions: {
  //        reply_markup: JSON.stringify({
  //            inline_keyboard: [
  //                [{text: 'Звук', callback_data: 'Звук'}, {text: 'NFC', callback_data: 'NFC'}, {text: '3', callback_data: '3'}],
  //                [{text: 'Питание', callback_data: 'Питание'}, {text: 'UEM', callback_data: 'UEM'}],
  //            ]
  //        }
  //        )
  //    },

  //    problemSolveOptions: {
  //     reply_markup: JSON.stringify({
  //         inline_keyboard: [
  //             [{text: 'Перезагрузка', callback_data: 'reload'}],
  //             [{text: 'Амандос', callback_data: 'Amandos'},
  //             {text: 'Выкл/вкл', callback_data: 'on/off'}]
  //         ]
  //     })
  //    },

  problemOptions: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          { text: "Звук", callback_data: "Звук" },
          { text: "NFC", callback_data: "NFC" },
          { text: "3", callback_data: "3" },
        ],
        [
          { text: "Питание", callback_data: "Питание" },
          { text: "UEM", callback_data: "UEM" },
        ],
      ],
    }),
  },

  problemSolveOptions: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: "Перезагрузка", callback_data: "reload" }],
        [
          { text: "Амандос", callback_data: "Amandos" },
          { text: "Выкл/вкл", callback_data: "on/off" },
        ],
      ],
    }),
  },
};
