import { Console } from "@woowacourse/mission-utils";
import Car from "./Car.js";

class Game {
  carLists = [];
  error = "";
  flag = "run";
  func = {
    run: this.run.bind(this),
    error: async () => this.error,
  };

  settingCarLists(input) {
    this.carLists = input.split(",").map((item) => {
      if (item.length >= 5) {
        this.error = "자동차 이름은 5자 이하만 가능합니다.";
        this.flag = "error";
      }
      return new Car(item);
    });
  }

  async setting() {
    const input = await Console.readLineAsync(
      "경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)"
    );
    this.settingCarLists(input);
  }

  routine() {
    let maximumScore = 0;

    this.carLists.forEach((item) => {
      item.move();
      item.print();
      if (maximumScore < item.count) {
        maximumScore = item.count;
      }
    });
    return maximumScore;
  }

  async run(count) {
    let maximumScore = 0;
    while (count > 0) {
      maximumScore = this.routine();
      count--;
    }
    const result =
      this.carLists
        .filter((item) => item.count >= maximumScore)
        .map((item) => item.getName())
        .join(", ") + "가 최종 우승했습니다.";
    Console.print(result);
  }

  async settingCount() {
    const count = await Console.readLineAsync("시도할 회수는 몇회인가요?");

    if (typeof +count !== "number") {
      this.error = "시도 횟수는 숫자만 가능합니다.";
      this.flag = "error";
    }
    return +count;
  }

  async play() {
    await this.setting();
    let count = await this.settingCount();
    return this.func[this.flag](count);
  }
}

export default Game;
