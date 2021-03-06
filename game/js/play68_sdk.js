(function() {
    var d = function() {};
    d.prototype = {
        postData: function(a) {
            window.parent.postMessage(a, "*")
        },
        goHome: function(a) {
            this.postData({
                op_type: "fn",
                value: {
                    fn: "go_home",
                    args: [{
                        url: a
                    }]
                }
            })
        },
        setShareInfo: function(a, b, c) {
            this.postData({
                op_type: "fn",
                value: {
                    fn: "setShareInfo",
                    args: [{
                        title: a,
                        desc: b,
                        showShareTime: c
                    }]
                }
            })
        },
        shareFriend: function() {
            this.postData({
                op_type: "fn",
                value: {
                    fn: "share",
                    args: []
                }
            })
        },
        setHorizontal: function(a) {
            this.postData({
                op_type: "fn",
                value: {
                    fn: "setHorizontal",
                    args: [a]
                }
            })
        },
        rankingType: {
            RANKING_TYPE_SCORE_DESC: 1,
            RANKING_TYPE_SCORE_ASC: 2,
            RANKING_TYPE_LEVEL_SCORE_DESC: 3,
            RANKING_TYPE_LEVEL_SCORE_ASC: 4
        },
        rankingShowType: {
            RANKING_SHOW_AUTO: 0,
            RANKING_SHOW: 1,
            RANKING_SHOW_NO: 2
        },
        setRanking: function(a, b, c, e) {
            a = a || this.rankingType.RANKING_TYPE_SCORE_DESC;
            e = e || this.rankingShowType.RANKING_SHOW_AUTO;
            this.postData({
                op_type: "fn",
                value: {
                    fn: "ranking",
                    args: [{
                        type: a,
                        level: b || 0,
                        score: c || 0,
                        showRankingType: e
                    }]
                }
            })
        },
        setRankingScoreDesc: function(a, b) {
            this.setRanking(this.rankingType.RANKING_TYPE_SCORE_DESC, 0, a, b)
        },
        setRankingScoreAsc: function(a,
            b) {
            this.setRanking(this.rankingType.RANKING_TYPE_SCORE_ASC, 0, a, b)
        },
        setRankingLevelScoreDesc: function(a, b, c) {
            this.setRanking(this.rankingType.RANKING_TYPE_LEVEL_SCORE_DESC, a, b, c)
        },
        setRankingLevelScoreAsc: function(a, b, c) {
            this.setRanking(this.rankingType.RANKING_TYPE_LEVEL_SCORE_ASC, a, b, c)
        },
        showRanking: function() {
            this.postData({
                op_type: "fn",
                value: {
                    fn: "showRanking",
                    args: []
                }
            })
        },
        closeRecommend: function() {
            this.postData({
                op_type: "fn",
                value: {
                    fn: "closeRecommend",
                    args: []
                }
            })
        },
        festivalgame: function() {
            this.postData({
                op_type: "fn",
                value: {
                    fn: "festivalgame",
                    args: []
                }
            })
        },
        setCrazycaitu: function(a) {
            this.postData({
                op_type: "fn",
                value: {
                    fn: "setCrazycaitu",
                    args: [{
                        id: a
                    }]
                }
            })
        },
        getCrazycaitu: function() {
            this.postData({
                op_type: "fn",
                value: {
                    fn: "getCrazycaitu",
                    args: []
                }
            })
        },
        putLocalStorage: function(a, b) {
            this.postData({
                op_type: "fn",
                value: {
                    fn: "putLocalStorage",
                    args: [{
                        kvVal: a,
                        keys: b
                    }]
                }
            })
        },
        pay: function(a, b, c, e) {
            this.postData({
                op_type: "fn",
                value: {
                    fn: "pay",
                    args: [{
                        itemid: a,
                        itemname: b,
                        price: c,
                        count: e
                    }]
                }
            })
        },
        __paysucc: null,
        onpaysucc: function(a) {
            if ("function" ===
                typeof a) this.__paysucc = a;
            else throw "onpaysucc\u53c2\u6570\u9519\u8bef\uff0c\u5fc5\u987b\u662f\u4e00\u4e2afunction\u3002";
        }
    };
    window.Play68 = new d;
    window.addEventListener("message", function(a) {
        var b = {
            wx_share_succ: function(a) {
                "function" === typeof on_wx_share_succ && on_wx_share_succ(a)
            },
            setStorage: function(a) {
                for (var b in a) void 0 != typeof localStorage.getItem(b) && localStorage.setItem(b, a[b])
            },
            getStorage: function(a) {
                var b = {},
                    d;
                for (d in a) {
                    var f = a[d];
                    localStorage.getItem(f) && (b[f] = localStorage.getItem(f))
                }
                Play68.putLocalStorage(b,
                    a)
            },
            paysucc: function(a) {
                "function" === typeof Play68.__paysucc && Play68.__paysucc(a)
            }
        };
        console.log("====== from parent begin ======");
        console.log(a);
        console.log("====== from parent end ======");
        switch (a.data.op_type) {
            case "fn":
               // b[a.data.value.fn].apply(window, a.data.value.args);
                break;
            default:
                console.log(a)
        }
    }, !1)
})();