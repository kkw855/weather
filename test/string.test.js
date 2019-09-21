test("includes", () => {
  const sentence = "The quick brown fox jumps over the lazy dog.";
  expect(sentence.includes(" fox ")).toEqual(true);
  expect(sentence.includes(" The")).toEqual(false);

  // 두 번째 파라미터는 검색을 시작할 index
  expect(sentence.includes("fox", 16)).toEqual(true);
  expect(sentence.includes("fox", 17)).toEqual(false);
});

test("startsWith", () => {
  const str = "Saturday night plans";

  // 두 번째 파라미터는 검색을 시작할 index
  expect(str.startsWith("Sat")).toEqual(true);
  expect(str.startsWith("Sat", 3)).toEqual(false);
});


