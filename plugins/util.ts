import prettyBytes from "pretty-bytes";
import dayjs from "dayjs";
import  timezone from 'dayjs/plugin/timezone.js' // import plugin
import  utc from 'dayjs/plugin/utc.js'
dayjs.extend(timezone) // use plugin
dayjs.extend(utc) // use plugin


const util = {
    /**
     * 초변환
     * @param sect
     */
    secToTime:(sect)=>{
        let sec = Math.round(sect);
        let hours = Math.floor(sec / 3600);
        let minutes = Math.floor((sec - (hours * 3600)) / 60);
        let seconds = sec - (hours * 3600) - (minutes * 60);

        if(hours < 10) hours = '0' + hours;
        if(minutes < 10) minutes = '0' + minutes;
        if(seconds < 10) seconds = '0' + seconds;

        if(hours > 0) {
            return hours + ':' + minutes + ':' + seconds;
        }else {
            return minutes + ':' + seconds;
        }
    },
    secToTime2(sect){
        let sec = Math.round(sect);
        let hours = Math.floor(sec / 3600);
        let minutes = Math.floor((sec - (hours * 3600)) / 60);
        let seconds = sec - (hours * 3600) - (minutes * 60);

        if(hours < 10) hours = '0' + hours;
        if(minutes < 10) minutes = '0' + minutes;
        if(seconds < 10) seconds = '0' + seconds;

        return hours + ':' + minutes + ':' + seconds;
    },
    /**
     * 바이트 표시
     * @param bytes
     */
    prettyBytesFt :(bytes) => {
        return prettyBytes(bytes);
    },

    dateFormat:(date) => {
        return dayjs(date).tz('asia/Seoul').format('YYYY-MM-DD HH:mm:ss');
    },
    dateFormat2:(date) => {
        return dayjs(date).tz('asia/Seoul').format('YYYY.MM.DD HH:mm');
    },


    textTime(date) {

        const start = new Date(dayjs(date).tz('asia/Seoul').format("YYY-MM-DD HH:mm:ss"));
        const end = new Date(dayjs().tz('asia/Seoul').format("YYY-MM-DD HH:mm:ss")); // 현재 날짜

        const diff = (end - start) / 1000; // 경과 시간

        const times = [
            { name: '년', milliSeconds: 60 * 60 * 24 * 365 },
            { name: '개월', milliSeconds: 60 * 60 * 24 * 30 },
            { name: '일', milliSeconds: 60 * 60 * 24 },
            { name: '시간', milliSeconds: 60 * 60 },
            { name: '분', milliSeconds: 60 },
        ];

        // 년 단위부터 알맞는 단위 찾기
        for (const value of times) {
            const betweenTime = Math.floor(diff / value.milliSeconds);

            // 큰 단위는 0보다 작은 소수 단위 나옴
            if (betweenTime > 0) {
                return `${betweenTime}${value.name} 전`;
            }
        }

        // 모든 단위가 맞지 않을 시
        return "방금 전";
    },
    nl2br(str){
        try {
            return str.replace(/\n/g, "<br />");
        }catch (e) {

        }
    },

    numberToKorean(number){
        number = parseInt(number);
        var inputNumber  = number < 0 ? false : number;
        var unitWords    = ['', '만', '억', '조', '경'];
        var splitUnit    = 10000;
        var splitCount   = unitWords.length;
        var resultArray  = [];
        var resultString = '';

        for (var i = 0; i < splitCount; i++){
            var unitResult = (inputNumber % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
            unitResult = Math.floor(unitResult);
            if (unitResult > 0){
                resultArray[i] = unitResult;
            }
        }

        for (var i = 0; i < resultArray.length; i++){
            if(!resultArray[i]) continue;
            resultString = String(resultArray[i]) + unitWords[i] + resultString;
        }

        return resultString || 0;
    },

    /**
     * 타이틀 검수
     * @param str
     */
    titleMake(str) {
        /*let underScore = str.indexOf('_');
        if(underScore > 2) {
            str = str.replaceAll('_', ' ');
        }
        let hipen = str.indexOf('-');
        if(hipen > 2) {
            str = str.replaceAll('-', ' ');
        }*/
        return str;
    },

    /**
     * 가로/세로 비율
     * @param width
     * @param height
     * @param split
     */
    getRate(width,height, split? = '/') {
        let a = width;
        let b = height;

        while(b !== 0) {
            let temp = b;
            b = a % b;
            a = temp;
        }

        return `${width/a}${split}${height/a}`;
    },

    randomName(){
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (let i = 0; i < 5; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    },

};

export default defineNuxtPlugin((nuxtApp) => {
    return {
        provide: {
            util
        }
    }
})
