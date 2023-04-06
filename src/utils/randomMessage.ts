const sentenceStructures = [
   ["Sự", "tình", "đã", "làm cho", "tôi", "cảm thấy", "hạnh phúc"],
   ["Tình bạn", "là", "một phần", "quan trọng nhất", "trong cuộc sống"],
   ["Tôi tin rằng", "thành công", "đến với", "những người", "kiên trì"],
   ["Yêu thương", "và", "sự đồng cảm", "là những yếu tố", "quan trọng nhất", "trong mối quan hệ"],
   ["Hạnh phúc", "không phải", "là có tất cả mọi thứ", "mà là", "biết đủ"],
   ["Sức khỏe", "là", "quý giá nhất", "trong cuộc sống"],
   ["Để thành công", "trong bất cứ việc gì", "cần phải có", "sự cố gắng", "và", "kiên trì"],
   ["Sự tự do", "đi đôi với", "sự trách nhiệm"],
   ["Khi chúng ta", "tự tôn trọng", "người khác", "chúng ta cũng", "được tôn trọng"],
   ["Tôi luôn", "tìm cách", "tạo ra", "sáng tạo"],
   ["Hạnh phúc gia đình", "là", "mục tiêu", "quan trọng", "nhất"],
   ["Sự", "phát triển", "luôn", "đi đôi với", "sự học tập", "liên tục"],
   ["Sự", "thành công", "không bao giờ", "đến với", "những người", "lười biếng"],
   ["Tôi luôn", "nghĩ đến", "sự đồng cảm", "và", "tình người", "trong cuộc sống"],
   ["Kỷ luật", "là", "một yếu tố", "quan trọng", "trong mọi hoạt động"],
   ["Sự tin tưởng", "là", "nền tảng", "quan trọng nhất", "của mối quan hệ"],
];

const adjectives = [
   "tuyệt vời",
   "vui vẻ",
   "tự do",
   "tuyệt đẹp",
   "đầy năng lượng",
   "thú vị",
   "đáng yêu",
   "quý giá",
   "thông minh",
   "trung thành",
];

const nouns = [
   "tình bạn",
   "hạnh phúc",
   "sức khỏe",
   "thành công",
   "sự đồng cảm", 
   "tự do",
   "sự phát triển",
   "kỷ luật",
   "sự tin tưởng",
   "tình yêu",
   "niềm tin",
];

export function generateRandomSentence() {
   const structureIndex = Math.floor(Math.random() * sentenceStructures.length);
   const adjectiveIndex = Math.floor(Math.random() * adjectives.length);
   const nounIndex = Math.floor(Math.random() * nouns.length);

   const sentenceStructure = sentenceStructures[structureIndex];
   const adjective = adjectives[adjectiveIndex];
   const noun = nouns[nounIndex];

   let sentence = "";
   for (let i = 0; i < sentenceStructure.length; i++) {
      if (sentenceStructure[i] === "Sự") {
         sentence += "Sự ";
      } else if (sentenceStructure[i] === "là") {
         sentence += "là ";
      } else if (sentenceStructure[i] === "và") {
         sentence += "và ";
      } else if (sentenceStructure[i] === "đã") {
         sentence += "đã ";
      } else if (sentenceStructure[i] === "của") {
         sentence += "của ";
      } else if (sentenceStructure[i] === "trong") {
         sentence += "trong ";
      } else if (sentenceStructure[i] === "không bao giờ") {
         sentence += "không bao giờ ";
      } else if (sentenceStructure[i] === "cần phải có") {
         sentence += "cần phải có ";
      } else if (sentenceStructure[i] === "đi đôi với") {
         sentence += "đi đôi với ";
      } else if (sentenceStructure[i] === "làm cho") {
         sentence += "làm cho ";
      } else if (sentenceStructure[i] === "tôi") {
         sentence += "tôi ";
      } else if (sentenceStructure[i] === "sự tin tưởng") {
         sentence += "sự tin tưởng ";
      } else if (sentenceStructure[i] === "cảm thấy") {
         sentence += "cảm thấy ";
      } else if (sentenceStructure[i] === "tự tôn trọng") {
         sentence += "tự tôn trọng ";
      } else if (sentenceStructure[i] === "tạo ra") {
         sentence += "tạo ra ";
      } else if (sentenceStructure[i] === "quan trọng") {
         sentence += "quan trọng ";
      } else if (sentenceStructure[i] === "nhất") {
         sentence += "nhất ";
      } else if (sentenceStructure[i] === "một phần") {
         sentence += "một phần ";
      } else if (sentenceStructure[i] === "kiên trì") {
         sentence += "kiên trì ";
      } else {
         sentence += sentenceStructure[i] + " ";
      }
   }

   sentence += adjective + " " + noun + ".";
   return sentence;
}