// イベントクラスの基底クラス
export class Event {
    description;
    probability;

    constructor(description, probability) {
      this.description = description;
      this.probability = probability;
    }

    execute() {
        // 何もしない。イベントごとにオーバーライドされる。
    }

    stopEventExecution() {
        // 何もしない。イベントごとにオーバーライドされる。
    }
}





