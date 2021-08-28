module.exports.config = {
	name: "adm",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Nguyễn Minh Quân",
	description: "Thông tin người điều hành bot",
	commandCategory: "info",
	cooldowns: 1
};

module.exports.run = ({ event, api }) => api.sendMessage(`Thông tin người điều hành bot:
Facebook: Trần Trọng Mạnh 
Username: trongmanh2004
Giới tính: Nam
Facebook : https://www.facebook.com/ttm130`, event.threadID, event.messageID);

