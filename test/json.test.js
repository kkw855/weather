import AllCityList from "../rest_api/city.list";

test("json to javascript object", () => {
  console.log(AllCityList.filter(_ => _.country === "KR").length);
});