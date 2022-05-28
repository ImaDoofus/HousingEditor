/// <reference path="C:/Users/imado/curseforge/minecraft/Instances/jhsdka/config/ChatTriggers/modules/CTAutocomplete-2.0.4/index.d.ts" />
/// <reference lib="es2015" />

import Action from './actions/Action.js';

var a = 20

let changeStat1 = new Action('change_stat', { stat: a+1 });
let changeStat2 = new Action('change_stat', { stat: a+2 });
let changeStat3 = new Action('change_stat', { stat: a+3 });
let changeStat4 = new Action('change_stat', { stat: a+4 });
let changeStat5 = new Action('change_stat', { stat: a+5 });

changeStat1.load();
changeStat2.load();
changeStat3.load();
changeStat4.load();
changeStat5.load();

let statMessage = new Action('send_a_chat_message', { message: `stat${a}: %%stat_${a}%%, stat${a-1}: %%stat_${a-1}%%` });
let statMessage2 = new Action('send_a_chat_message', { message: `stat${a-2}: %%stat_${a-2}%%, stat${a-3}: %%stat_${a-3}%%` });
let statMessage3 = new Action('send_a_chat_message', { message: `stat${a-4}: %%stat_${a-4}%%` });
statMessage.load();
statMessage2.load();
statMessage3.load();