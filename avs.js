
let ccCtrl;

window.onload = function () {

    ccCtrl = new ccSpeedController();
    //デバッグ用
    // ccCtrl.AddButton();
    // const videoButtonId = document.getElementById("videoButton");
    // videoButtonId.addEventListener("click", function () {
    //     let fff = ccCtrl.CraeteSpeedController();
    //     alert(fff);
    // }, false);

    ccCtrl.Start();
}



class ccSpeedController{

    //デバッグ用ボタンを追加
    AddButton() {
        const divElement = document.createElement("div");
        divElement.innerHTML = '<hr>デバッグ用</hr><br><button id="videoButton" type="button" >作成したボタン</button>'
        document.body.insertBefore(divElement, document.body.firstChild);
    }

    /** 再生速度変更用のコントロール追加処理の開始 */
    Start() {
        //追加失敗したら、1回リトライする
        let bFlg = this.CraeteSpeedController();
        if (!bFlg) {
            setTimeout( () => {
                this.CraeteSpeedController()
            }, 5000);
        }
    }

    /** 再生速度変更用コントロールを追加 */
    CraeteSpeedController() {
        if (!this.ExistVideo()) {
            return false;
        }
    
        if (!this.ExistClassName("subtitlesAndAudioWrapper")) {
            return false;
        }

        //videoタグをメンバ変数に設定
        const videoTag = document.getElementsByTagName("video");
    
        this.AddSpeedControllButton();
    
        const videoButtonId = document.getElementById("avsShowControllerId");
        videoButtonId.addEventListener("click", function () {

            const target = document.getElementById("avsMainControllerId");
            target.classList.toggle("avsDisplayNone");
        }, false);


        //再生速度の増加
        const speedUp = document.getElementById("avsSpeedUp");
        speedUp.addEventListener("click", function () {

            let pSpeed = 1;
            let videoTags = document.getElementsByTagName("video");
            videoTags.forEach = Array.prototype.forEach;
            videoTags.forEach(function (v) {
                v.playbackRate += 0.1;
                pSpeed = v.playbackRate;
            });

            document.getElementById("avsShowControllerId").innerText = (Math.floor(pSpeed * 10) / 10).toFixed(1);

        }, false);

        //再生速度のリセット
        const speedReset = document.getElementById("avsSpeedReset");
        speedReset.addEventListener("click", function () {

            let videoTags = document.getElementsByTagName("video");
            videoTags.forEach = Array.prototype.forEach;
            videoTags.forEach(function (v) {
                v.playbackRate = 1;
            });

            document.getElementById("avsShowControllerId").innerText = "1.0";

        }, false);

        //再生速度の減少
        const speedDown = document.getElementById("avsSpeedDown");
        speedDown.addEventListener("click", function () {

            //FIXME forEach内が実行されない・・・
            //      使わないから、とりあえず放置
            let pSpeed = 1.0;
            let videoTags = document.getElementsByTagName("video");
            videoTags.forEach = Array.prototype.forEach;
            videoTags.forEach(function (v) {
                v.playbackRate -= 0.1;
                let pSpeed = v.playbackRate;
            });
            alert(pSpeed);
            document.getElementById("avsShowControllerId").innerText = (Math.floor(pSpeed * 10) / 10).toFixed(1);
        }, false);

        return true;


    }


    /** Videoタグがあるかをチェック */
    ExistVideo() {
        // alert("テスト中");
        const videoTag = document.getElementsByTagName("video");
        
        if (videoTag.length === 0) {
            this.DebugMyAlert("Videoタグなし");
            return false;
        } else {
            this.DebugMyAlert("Videoタグあり");
            return true;
        }
    }
    
    /** 引数で指定したクラス名が存在するかをチェック
     * @param {String} className 
     */
    ExistClassName(className) {
        const checkClassName = document.getElementsByClassName(className);
        if (!checkClassName) {
            this.DebugMyAlert(className + "クラスなし");
            return false;
        } else {
            this.DebugMyAlert(className + "クラスあり！！！");
            return true;
        }
    }
    
    /** 再生速度変更ボタン追加 */
    AddSpeedControllButton() {

        //「字幕と音声」の左にボタンを追加するために、
        //「字幕と音声」を取得する
        const beforeElement = document.getElementsByClassName("subtitlesAndAudioWrapper")[0];
        let divElement = document.createElement("div");
        divElement.innerHTML =
            '<div><span id="avsShowControllerId" class="avsShow" >1.0</span></div>' +
            '<div id="avsMainControllerId" class="avsMain avsDisplayNone" >' +
            '<button type="button" id="avsSpeedUp" class="avsMainController" >+</button>' +
            '<button type="button" id="avsSpeedReset" class="avsMainController" >R</button>' +
            '<button type="button" id="avsSpeedDown" class="avsMainController" >-</button>' +
            '</div>';
        divElement.className = "avsTop";


        beforeElement.parentNode.insertBefore(divElement, beforeElement);
        
        //「字幕と音声」と再生速度変更ボタンの間をあけるためのスペース用
        let divElement2 = document.createElement("div");
        divElement2.innerHTML = '<div style="15px;"></div>'
        divElement2.style = "width:10px";
        beforeElement.parentNode.insertBefore(divElement2, beforeElement);
    
        this.DebugMyAlert("再生速度変更ボタンの追加成功");
    }
    
    /** Alertを表示（デバッグ用）
     * @param {String} str 
     */
    DebugMyAlert(str) {

        //デバッグ中？
        const _debugFlag = false;

        if (_debugFlag) {
            alert(str);
        }
    }
}
