import Immutable, { List, Map, OrderedMap, Set, Seq, Stack, Record } from "immutable";
// import AllCityList from "../rest_api/city.list";

const cityArray = [
  {
    "id": 707860,
    "name": "Hurzuf",
    "country": "UA",
    "coord": {
      "lon": 34.283333,
      "lat": 44.549999
    }
  },
  {
    "id": 1832257,
    "name": "Neietsu",
    "country": "KR",
    "coord": {
      "lon": 128.468216,
      "lat": 37.184471
    }
  },
  {
    "id": 519188,
    "name": "Novinki",
    "country": "RU",
    "coord": {
      "lon": 37.666668,
      "lat": 55.683334
    }
  },
  {
    "id": 1283378,
    "name": "Gorkhā",
    "country": "NP",
    "coord": {
      "lon": 84.633331,
      "lat": 28
    }
  },
  {
    "id": 1832743,
    "name": "Yeoju",
    "country": "KR",
    "coord": {
      "lon": 127.633888,
      "lat": 37.29583
    }
  },
];

const cityList = List(cityArray);

test("Construction", () => {
  expect(List() instanceof List).toEqual(true);
  expect(Map() instanceof Map).toEqual(true);
  expect(OrderedMap() instanceof OrderedMap).toEqual(true);
  expect(Set() instanceof Set).toEqual(true);
  expect(Seq() instanceof Seq).toEqual(true);
  expect(Stack() instanceof Stack).toEqual(true);
  expect(new Record({})() instanceof Record).toEqual(true);

  const firstMap = Map({ a: 1, b: 2, c: 3 });
  // 불필요한 복사 연산이 발생하지 않는다.
  const myMap = Map(firstMap);
  expect(firstMap).toBe(myMap);

  // 생성자 대신 of 를 사용하면 불필요한 인스턴스를 생성해서 메모리를 낭비하지 않는다.
  expect(List.of(1, 2, 3)).toMatchObject(List([1, 2, 3]));
  expect(List.of(1, 2, 3).toJS()).toMatchObject([1, 2, 3]);
  expect(Set.of(1, 2, 2).toJS()).toMatchObject([1, 2]);

  expect(Immutable.fromJS([1, 2, 3])).toEqual(List([1, 2, 3]));
  expect(Immutable.fromJS({ one: 1, two: 2, three: 3 })).toEqual(Map({ one: 1, two: 2, three: 3 }));
  expect(Immutable.fromJS({
    a: {
      b: ["c", "d"],
      e: {
        f: "g",
        h: "i"
      }
    }
  }).getIn(["a", "b"]).toJS()).toEqual(["c", "d"]);
});

test("get", () => {
  expect(List([1, 2, 3]).get(1)).toEqual(2);
  expect(Map({ a: 1, b: 2, c: 3 }).get("b")).toEqual(2);
});

test("insert", () => {
  expect(List([1, 2, 3]).push(4).toJS()).toMatchObject([1, 2, 3, 4]);
  expect(Map({ "one": 1, "two": 2, "three": 3 }).set("four", 4).toJS()).toMatchObject({
    "one": 1,
    "two": 2,
    "three": 3,
    "four": 4
  });

  expect(List.of(1, 2, 3)
    .push(4)
    .push(5, 6)
    .push(7, 8)
    .push(9).toJS()).toMatchObject([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  expect(Immutable.fromJS({ "one": 1, "two": 2, "three": 3 })
    .set("four", 4)
    .set("five", 5)
    .set("six", 6).toJS()).toMatchObject({
    one: 1, two: 2,
    three: 3, four: 4,
    five: 5, six: 6
  });
});

test("update", () => {
  expect(List([1, 2, 3]).get(1)).toEqual(2);
  expect(Map({ a: 1, b: 2, c: 3 }).get("b")).toEqual(2);
});
