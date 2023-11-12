import { MissionUtils } from "@woowacourse/mission-utils";

class Car {
  constructor(name) {
    this.name = name;
    this.count = 0;
  }

  getName() {
    return this.name;
  }

  movePossible() {
    if (MissionUtils.Random.pickNumberInRange(0, 9) >= 4) {
      return 1;
    }
    return 0;
  }

  move() {
    this.count += this.movePossible();
  }

  print() {
    MissionUtils.Console.print(`${this.name} : ${"-".repeat(this.count)}`);
  }
}

export default Car;
