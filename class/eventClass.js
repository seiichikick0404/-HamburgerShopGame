// イベントクラスの基底クラス
export class Event {
    constructor(description, probability) {
      this.description = description;
      this.probability = probability;
    }

    execute() {
      // 何もしない。イベントごとにオーバーライドされる。
    }
}





