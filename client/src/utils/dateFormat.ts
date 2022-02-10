export function dateFormat(date:string) {
  const myDate = new Date(date);
  return `${myDate.getMonth() + 1}/${myDate.getDate()}/${myDate.getFullYear()}`
}