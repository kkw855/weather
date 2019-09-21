import Immutable, {
  List, Map, OrderedMap, Set, OrderedSet, Seq, Stack, Record,
  fromJS,
  is
} from "immutable";

const seoul = fromJS({
  "id": 1835848,
  "name": "Seoul",
  "country": "KR",
  "coord": {
    "lon": 126.977829,
    "lat": 37.56826
  }
});

test("Construction", () => {
  expect(List() instanceof List).toEqual(true);
  expect(Map() instanceof Map).toEqual(true);
  expect(OrderedMap() instanceof OrderedMap).toEqual(true);
  expect(Set() instanceof Set).toEqual(true);
  expect(OrderedSet() instanceof OrderedSet).toEqual(true);
  expect(Seq() instanceof Seq).toEqual(true);
  expect(Stack() instanceof Stack).toEqual(true);
  expect(new Record({})() instanceof Record).toEqual(true);

  const firstMap = Map({ a: 1, b: 2, c: 3 });
  // 불필요한 복사 연산이 발생하지 않는다. 동일한 reference 를 참조한다.
  const myMap = Map(firstMap);
  expect(firstMap).toBe(myMap);

  // 생성자 대신 of 를 사용하면 불필요한 인스턴스를 생성해서 메모리를 낭비하지 않는다.
  expect(List.of(1, 2, 3)).toMatchObject(List([1, 2, 3]));
  expect(List.of(1, 2, 3).toJS()).toMatchObject([1, 2, 3]);
  expect(Set.of(1, 2, 2).toJS()).toMatchObject([1, 2]);

  expect(fromJS([1, 2, 3])).toEqual(List([1, 2, 3]));
  expect(fromJS({ one: 1, two: 2, three: 3 })).toEqual(Map({ one: 1, two: 2, three: 3 }));
  expect(fromJS({
    a: {
      b: ["c", "d"],
      e: {
        f: "g",
        h: "i"
      }
    }
  }).getIn(["a", "b"])).toEqual(List(["c", "d"]));
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
  expect(fromJS({ "one": 1, "two": 2, "three": 3 })
    .set("four", 4)
    .set("five", 5)
    .set("six", 6).toJS()).toMatchObject({
    one: 1, two: 2,
    three: 3, four: 4,
    five: 5, six: 6
  });

  // set 함수 호출시 중간에 엘리먼트는 undefined 로 채운다.
  expect(List.of(1, 2, 3)
    .set(4, 5).toJS())
    .toMatchObject([1, 2, 3, undefined, 5]);
});

test("update", () => {
  expect(List.of(1).set(0, 2).toJS()).toMatchObject([2]);

  const list = List.of(
    fromJS({ total: 0, value: 5 }),
    fromJS({ total: 5, value: 10 })
  );
  const incrementUsingSet = map => map.set(
    "total",
    map.get("total") + map.get("value")
  );
  expect(list
    .update(0, incrementUsingSet)
    .update(1, incrementUsingSet).toJS())
    .toMatchObject(
      [
        { total: 5, value: 5 },
        { total: 15, value: 10 }
      ]);

  expect(fromJS({ one: 1 }).set("one", "one").toJS())
    .toMatchObject({ one: "one" });
  expect(fromJS({ one: 1 }).update("one", value => value + 5).toJS())
    .toMatchObject({ one: 6 });
});

test("find", () => {
  const list = List.of(1, 2, 3);
  const map = fromJS({
    one: 1,
    two: 2,
    three: 3
  });

  // 값을 return 한다.
  expect(list.find(v => v === 3)).toEqual(3);
  expect(map.find(v => v === 3)).toEqual(3);

  // 찾는 값이 존재하지 않으면 undefined 를 return 한다.
  expect(list.find(v => v === 4)).toEqual(undefined);

  // undefined 대신 다른 값을 return 하게 할 수 있다.
  expect(list.find(v => v === 4, null, 0))
    .toEqual(0);
});

test("compare", () => {
  const list = fromJS([1, 2]);

  // is 함수는 내부적으로 첫 번째 파라미터의 equals 함수를 호출한다.
  expect(is(list, List.of(1, 2))).toEqual(true);
  expect(is(list, List.of(2, 1))).toEqual(false);
  expect(list.equals(List.of(1, 2))).toEqual(true);
  expect(list.equals(List.of(2, 1))).toEqual(false);

  // 속성 순서는 상관 없다.
  expect(is(seoul, fromJS({
    "coord": {
      "lat": 37.56826,
      "lon": 126.977829
    },
    "country": "KR",
    "id": 1835848,
    "name": "Seoul"
  }))).toEqual(true);
  // 속성의 값이 다르다.
  expect(is(seoul, fromJS({
    "country": "KR",
    "id": 1835848,
    "name": "Seoul",
    "coord": {
      "lat": 37.56826,
      "lon": 0
    }
  }))).toEqual(false);
  // include 속성(key)가 존재하지 않는다.
  expect(is(seoul, fromJS({
    "country": "KR",
    "id": 1835848,
    "name": "Seoul",
    "coord": {
      "lat": 37.56826,
      "lon": 0
    },
    "include": "yes"
  }))).toEqual(false);
});