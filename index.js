const { google } = require("googleapis");
const spreadsheetId = "1UExYM3G9bm3smgXyFrXfyMKJ5qBtskykvv5WKZAOnyY";
const TelegramApi = require("node-telegram-bot-api");
const token = "1934946275:AAElahK5YpKpHZMgxjdqdlvvApnUQK0ERz8";
const bot = new TelegramApi(token, { polling: true });
bot.on("polling_error", console.log);

const auth = new google.auth.GoogleAuth({
  keyFile: "credentials.json",
  scopes: "https://www.googleapis.com/auth/spreadsheets",
});
const client = auth.getClient();
const googleSheets = google.sheets({ version: "v4", auth: client });

// const getRows = googleSheets.spreadsheets.values.get({
//   auth,
//   spreadsheetId,
//   range: "Sheet2",
// });

// write
// await googleSheets.spreadsheets.values.append({
//   auth,
//   spreadsheetId,
//   range: "Sheet1!A:C",
//   valueInputOption: "USER_ENTERED",
//   resource: {
//     values: [
//       ["727AZ04", "NFC", "Amandos"]
//     ]
//   }
// })

// res.send(getRows.data);

var answerCallbacks = {};

bot.setMyCommands([
  { command: "/start", description: "START" },
  { command: "/shkolnik", description: "Добавить школьную карту" },
  { command: "/pensioner", description: "Добавить пенсионную карту" },
]);

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Welcome");
});

bot.on("message", function (message) {
  var callback = answerCallbacks[message.chat.id];
  if (callback) {
    delete answerCallbacks[message.chat.id];
    return callback(message);
  }
});

function dateConverter(date) {
  const milliseconds = date * 1000;
  const dateObject = new Date(milliseconds);
  const humanDateFormat = dateObject.toLocaleString();
  return humanDateFormat;
}

bot.onText(/\/shkolnik/, function (message, match) {
  bot.sendMessage(message.chat.id, "Введите фамилию клиента").then(function () {
    answerCallbacks[message.chat.id] = function (answer) {
      var date = dateConverter(answer.date);
      // var usr = "";
      // var user = answer.from.id;
      // if (user == 374936644) {
      //   usr = "Абилмансур";
      // } else if (user == 544981576) {
      //   usr = "Рахымжан";
      // } else if (user == 892112217) {
      //   usr = "Алишер";
      // } else if (user == 1683045150) {
      //   usr = "Дарын";
      // } else if (user == 1145989216) {
      //   usr = "Еркин";
      // } else {
      //   usr = "Unknown user";
      // }
      var lastname = answer.text;
      bot.sendMessage(message.chat.id, "Введите имя клиента").then(function () {
        answerCallbacks[message.chat.id] = function (answer) {
          var firstname = answer.text;
          bot
            .sendMessage(
              message.chat.id,
              "Введите отчество клиента(Если нет, поставьте -)"
            )
            .then(function () {
              answerCallbacks[message.chat.id] = function (answer) {
                var patronymic = answer.text;
                // bot.sendMessage(message.chat.id, gosNomer + problemm + solutionn);
                bot
                  .sendMessage(message.chat.id, "Введите ИИН клиента")
                  .then(function () {
                    answerCallbacks[message.chat.id] = function (answer) {
                      var iin = answer.text;
                      bot
                        .sendMessage(
                          message.chat.id,
                          "Введите номер телефона клиента"
                        )
                        .then(function () {
                          answerCallbacks[message.chat.id] = function (answer) {
                            var phone_number = answer.text;
                            bot
                              .sendMessage(
                                message.chat.id,
                                "Введите номер школы"
                              )
                              .then(function () {
                                answerCallbacks[message.chat.id] = function (
                                  answer
                                ) {
                                  var school = answer.text;
                                  bot
                                    .sendMessage(
                                      message.chat.id,
                                      "Введите номер карты"
                                    )
                                    .then(function () {
                                      answerCallbacks[
                                        message.chat.id
                                      ] = function (answer) {
                                        var card_number = answer.text;
                                        bot
                                          .sendMessage(
                                            message.chat.id,
                                            "Введите ФИО родителя полностью"
                                          )
                                          .then(function () {
                                            answerCallbacks[
                                              message.chat.id
                                            ] = function (answer) {
                                              var fio = answer.text;
                                              bot
                                                .sendMessage(
                                                  message.chat.id,
                                                  "Введите ИИН родителя"
                                                )
                                                .then(function () {
                                                  answerCallbacks[
                                                    message.chat.id
                                                  ] = function (answer) {
                                                    var iin2 = answer.text;
                                                    bot
                                                      .sendMessage(
                                                        message.chat.id,
                                                        "Введите номер телефона родителя"
                                                      )
                                                      .then(function () {
                                                        answerCallbacks[
                                                          message.chat.id
                                                        ] = function (answer) {
                                                          var phone_number2 =
                                                            answer.text;
                                                          googleSheets.spreadsheets.values.append(
                                                            {
                                                              auth,
                                                              spreadsheetId,
                                                              range:
                                                                "Школьный!A:K",
                                                              valueInputOption:
                                                                "USER_ENTERED",
                                                              resource: {
                                                                values: [
                                                                  [
                                                                    lastname,
                                                                    firstname,
                                                                    patronymic,
                                                                    iin,
                                                                    phone_number,
                                                                    school,
                                                                    card_number,
                                                                    fio,
                                                                    iin2,
                                                                    phone_number2,
                                                                    date,
                                                                  ],
                                                                ],
                                                              },
                                                            }
                                                          );
                                                          bot.sendSticker(
                                                            message.chat.id,
                                                            "https://tlgrm.ru/_/stickers/ea5/382/ea53826d-c192-376a-b766-e5abc535f1c9/7.webp"
                                                          );
                                                          bot.sendMessage(
                                                            message.chat.id,
                                                            "Спасибо!"
                                                          );
                                                        };
                                                      });
                                                  };
                                                });
                                            };
                                          });
                                      };
                                    });
                                };
                              });
                          };
                        });
                    };
                  });
              };
            });
        };
      });
    };
  });
});

bot.onText(/\/pensioner/, function (message, match) {
  bot.sendMessage(message.chat.id, "Введите фамилию клиента").then(function () {
    answerCallbacks[message.chat.id] = function (answer) {
      var date = dateConverter(answer.date);

      var lastname = answer.text;
      bot.sendMessage(message.chat.id, "Введите имя клиента").then(function () {
        answerCallbacks[message.chat.id] = function (answer) {
          var firstname = answer.text;
          bot
            .sendMessage(
              message.chat.id,
              "Введите отчество клиента(Если нет, поставьте -"
            )
            .then(function () {
              answerCallbacks[message.chat.id] = function (answer) {
                var patronymic = answer.text;
                bot
                  .sendMessage(message.chat.id, "Введите ИИН клиента")
                  .then(function () {
                    answerCallbacks[message.chat.id] = function (answer) {
                      var iin = answer.text;
                      bot
                        .sendMessage(
                          message.chat.id,
                          "Введите номер телефона клиента"
                        )
                        .then(function () {
                          answerCallbacks[message.chat.id] = function (answer) {
                            var phone_number = answer.text;
                            bot
                              .sendMessage(
                                message.chat.id,
                                "Введите номер карты клиента"
                              )
                              .then(function () {
                                answerCallbacks[message.chat.id] = function (
                                  answer
                                ) {
                                  var card_number = answer.text;

                                  googleSheets.spreadsheets.values.append({
                                    auth,
                                    spreadsheetId,
                                    range: "Пенсионер!A:G",
                                    valueInputOption: "USER_ENTERED",
                                    resource: {
                                      values: [
                                        [
                                          firstname,
                                          lastname,
                                          patronymic,
                                          iin,
                                          phone_number,
                                          card_number,
                                          date,
                                        ],
                                      ],
                                    },
                                  });
                                  bot.sendSticker(
                                    message.chat.id,
                                    "https://tlgrm.ru/_/stickers/ea5/382/ea53826d-c192-376a-b766-e5abc535f1c9/7.webp"
                                  );
                                  bot.sendMessage(message.chat.id, "Спасибо!");
                                };
                              });
                          };
                        });
                    };
                  });
              };
            });
        };
      });
    };
  });
});

// bot.on('message', (msg) => {
//   var othcet = "/report";
//   if (msg.text.indexOf(othcet) === 0) {
//     bot.sendMessage(msg.chat.id, "Введите гос. номер автобуса", {
//       "reply_markup": JSON.stringify({ force_reply: true })
//     });
//   }
// });

// bot.on('message', (msg) => {
//   if (msg.reply_to_message) {
//     if (msg.reply_to_message.text == "Введите гос. номер автобуса") {
//       bot.sendMessage(msg.chat.id, "Введите причину/проблему вызова", problemOptions);
//     }
//   }

//   // console.log(msg);
// });

// bot.on('callback_query', msg => {
//   const data = msg.data;
//   const chatId = msg.message.chat.id;
//   console.log(data);
//   if (data) {
//     bot.sendMessage(chatId, "Введите решение проблемы", problemSolveOptions);
//     // console.log(msg)
//   }

// });

// bot.on('message', (msg) => {
//   if (msg.reply_to_message.text == "Введите решение проблемы вызова") {
//     bot.sendSticker(msg.chat.id, 'https://tlgrm.ru/_/stickers/ea5/382/ea53826d-c192-376a-b766-e5abc535f1c9/7.webp')
//     bot.sendMessage(msg.chat.id, "СПАСИБО ЗА ПОМОЩЬ!");
//   }
//   // console.log(msg);
//   // console.log("------------------------")
// })

// })

// app.listen(1337, (req, res) => console.log("RUNNING on 1337"));
