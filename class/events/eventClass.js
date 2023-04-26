// イベントクラスの基底クラス
export class Event {
    title;
    description;
    probability;
    imgUrl;

    constructor(title, description, probability, imgUrl) {
        this.title = title;
        this.description = description;
        this.probability = probability;
        this.imgUrl = imgUrl;
    }

    execute() {
        // 何もしない。イベントごとにオーバーライドされる。
    }

    stopEventExecution() {
        // 何もしない。イベントごとにオーバーライドされる。
    }

    generateEventModal() {
        // 何もしない。イベントごとにオーバーライドされる。
    }
}





