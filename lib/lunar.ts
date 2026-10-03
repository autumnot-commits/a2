// 브라우저·Node에 내장된 음력(Intl 중국력)으로 음력 날짜를 구한다. 별도 패키지가 필요 없다.
// 중국력은 한국 음력과 대부분 같지만, 시차 때문에 드물게 하루 차이가 나는 달이 있다.
const formatter = new Intl.DateTimeFormat("ko-KR-u-ca-chinese", {
  timeZone: "Asia/Seoul",
  day: "numeric",
});

export function lunarDay(date: Date) {
  const part = formatter.formatToParts(date).find((p) => p.type === "day");
  return Number(part?.value);
}

// 손 없는 날: 음력으로 끝자리가 9·0인 날 (9, 10, 19, 20, 29, 30일)
export function isSonEomneunNal(date: Date) {
  const day = lunarDay(date);
  return day % 10 === 9 || day % 10 === 0;
}
