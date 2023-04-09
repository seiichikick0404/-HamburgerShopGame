// イベントクラスの基底クラス
class Event {
    constructor(name, description, probability) {
      this.name = name;
      this.description = description;
      this.probability = probability;
    }

    execute() {
      // 何もしない。イベントごとにオーバーライドされる。
    }
}





