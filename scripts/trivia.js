const axios = require('axios');
const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb://localhost/trivia_masters"
);

imageArr = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC4I2IRZiwVEIEIq33R-FfM5nadDU12omyEXsM_Qz2ggzSUBIO",
    "data:image/jpeg;base64,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",
    "https://img.newatlas.com/memristors-three-terminal-brain-like-computing.jpg?auto=format%2Ccompress&ch=Width%2CDPR&crop=entropy&fit=crop&h=347&q=60&w=616&s=5d06dfe676f05db6a7c94d09fa7e9799",
    "https://blogs.glowscotland.org.uk/my/forresacademy/files/2017/03/Cover-Photo-672x372.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Keanu_Reeves_%28crop_and_levels%29_%28cropped%29.jpg/220px-Keanu_Reeves_%28crop_and_levels%29_%28cropped%29.jpg",
    "https://cdn1.vectorstock.com/i/1000x1000/11/30/set-of-cute-cartoon-wild-animals-vector-2111130.jpg",
    "https://i.pinimg.com/originals/fc/1e/a3/fc1ea3d74166fe185a7db46dc8c418c5.jpg",
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAA8FBMVEX///+pqKcAAACeTBV5OxHhyahPTUuXini2p5LU1NOLi4qkTxZSUE58PBGcj3y9rpiwr67p0K4tKynExMREQkC3t7eQkI+mpaTEr5OWSBSFQBJ2OhExFgAaCQDHx8eamppMJQs8NzBnMg4ZGRdGQDjb29tIRkQsKyqORBNdLQ3z8/NmZmYUAABXKgyrnYlbU0iIemZ2dnZkZGTn5+dBIAlnXlKDdWJ1a11+fn4uLi4jIiE4GwZRSkGRgm1kMA2ikXkRERFhWU4+OC/OuJqwnYMRAABGIQgkDwAdHh5xZVQ4OToACAsjCAAVGRoiHhooDADAfZ9QAAAUaklEQVR4nO2dB1saTReG5VjZdylLtbJSBBuhKFXQRY3iJuH7///mO2fKFkBjYdiY+Fy5krxJ9N25mXLmOWdnVla+9KUvfelLX/oLFQ76AYJXFxpBP0LQSoMNvdOgnyJQXYAdNgFyQT9HkCpCMplL25AM+kGCUxNCOYRgw0XQTxKcMpBCBM1/eizkACCeAS3o5whQpzAOIYVy0M8RpMqQbkIZgn6MIJWFrvmPR0gYGyShGPRTBKsxJG04CvopAlUXTPwR9FMEqhzoaUgF/RTBCjcJY/i3N0s6xM8gHfRTBKoQNLJwFvRTBKoL6GGYHPRTBKseJMv/+LKoQQZ/BP0UgSoMG2noBf0UwQqXxcq/7JqsMPOoAfGgnyJQpeEsDs2gnyJQnUL/n18WbUjr8G/nlkzQTOgG/RSB6ghSSegH/RTBCiDZ+8eXxQZk8UfQTxGoktCMgx70UwSqUyjmrH/cN9mgdMKnya6GzxQ86idLJ5wBgJ5d7PzN0gnWQr+lUkEz2yjCYv2+T5ZOCIOZy4U16C7wkT9bOkGDJCsLYCNiMRw+XTrB6uVQoCczC+Pw6dIJ1O6MCdA/M5NpwcH80F7vE6YTkg1qt5nCn4qL4BD/nOmEowwZvzmHQ/IDHD5/OiGcKb+Vw+kRritueMHSCZ/eNwmbxMHi48J6mQMfSCQ7wybTvyidEDY3iEMT+4N5Rhw25nHI4l+Me6lUOWVXCEPur0snCA5sXMzjgMPesnVd3yDp5cQYoDn+C9MJkkNmtj9oACnefq5ygih0/850gjMu0sihSDWGZo6yJ30vAVQqkUjg336+ZfGVCps6TXycA/WHCvSmEGzoPYRgfbLo6I2SHGhczEHARgNB+Dz7xfcpnOUcYDyLYEMnBonPHSC9UmETo6dZAiibGPT/kvDgN8qBPacb8FmRRsNn2jO+Vz2Yi4BPCDgaPpF98l5dzJsQmQQDK+gnVC8TNuYz4JMizgifb2k4vTjKJdOhrKlpjUazWS6nKpXeD/CoV6nY5XKz2WhomhlPQQr3COUNXWiaQQJCQTfpFTq9CCfTptZopvowrfPzn//b379EPRySHui3V/v/+3l+PvNvrV/9Ss+2U5KHZPAHJ9wvwumsdlb+5Tbi59VD9eS6sBfZ3T3eWV397/da3dk53t2N7BWuq4eX+wfOd/qBOOx+nzP4A/OMF7l45qzsfNBXhyeFPWqzt2lvk5fJ8e5e4eTwysFhFcH+g7aOp+G41hQf+/lltbC26zT8jY1+DZFVpHF9uC9Q6N1QLmAUp+mu+OT3q4XI8eriWz5PO6TjSKF6KVCkGtlcQCFTkuzR7w/Xa6Lxaht+TDPE2p7U2tpaBLVGI4TPo3omvewucdEDqO6uqv/gcS7gbV+bKyIRKZw88D5R1pYIIglQUN7tqfnPNn6GBM4TV8AdiKW865uDgx3VnX/3dc2fAcF6RFN5GHkBB2oB7K69sf1+EFXsEKpfek7BzgsteEUU9Gx0hF9MAN7Xfg+ItX3FQVQYTv6b01wK78TsXShcX59Uq1U3Dp7WlYyU8V+dXF8XCoW9vQiGkhH8lU90Xr0Dw6FaCA3gBFg4e1J9uNo/+D4T53tD/iKXCPXFf1kvfQmuugePBOrhsMoi7b23IkEIKocDPFA3+K/qxPH9fGlQG7U6nU69vrm5GY1Gv337trW1FXuV8B/iP49G8Ss36238Jq1RbVDKJyY/prCcE5XDaSTPQthXmJO8wGWRGJzAEBu7Nd2eD2qKD4ODZFojxDKZIkJAcBA9RwNsZQySsMvmgmv49sqWvFavILNVg/v7m2H7qXbrIXLAcez5YOBoUNYRcoJBYYqB+OCim0P63FiHLt0m8onipFicHu1F/MMJzg35Uqk0wHE0atFIareHQxxKbCDN5/JtswbrhtT63TbjMUj4aYh1ZU+dyRCGCBsLexD1AthslSbTTYXxuN/r9ewUEzeGhfCPe5Xx+NfMl3hAJfKD1nAr5kUQHcC6T5IH4ag/1fL0hY+8J0QOxqoYHMEeYxCBTRdBh/7f/ZTePGt0tUzGzGZD8TcoFMpmTTOT0bRut9E4O2vqOmXbKd0OLYcCTpvIwFh/RqJzrMO+YHCpLBcj5sTVXRg6DBIw7mZlcz4qL5xs1waocwi0cERLzzOQgoeInBBU7alP4VowqEsERTjztD3L9HEWgohmQStG42CWARsD23eGD8sdHCpnsCLCxGNoi4GQh25ctj6eTqeTqHQaP8QFgbBhFOMINqN5l4GxfjPgM8fo3kNhG6qCwYNCBlXGYAc6MTEX8F6QDaVzYZ9yCxgZqHgKOpuSQVE217jB8MyyU7bdx/nTpXAP14LBlbrcLBwKBi0+TmEcZwSmAKCO0gthEIr3YSgYJBwGAyj2xpSP0nUdJ42O4aApiADhZ0Udg0u+ZcIeyruBRgjSMwSwGyxqVjAhERUM8qKteejT58/T07rehxb/C6MOIj6IKHz/tbfPGPwHNcZgAvG5CNKhhc2LoXgT2pzBhDMwStADsPUyVETFVgXa/G+eQAaKChMx5Z+CwYDtd6CJDOIzBBYHgJSFfJQzKFFLjSEOAijq1PSyyMKNYZsxqEkGewqz0/o5Z/D9lhjUaShkpwgkF0sAGevA+wEwButg0SRAoadbuAWsixi3B4JBQWHh0hlwBo8JZBBrQXamGyy4E5A0aEUZg5rBugE2X0cQ3o7QYx3B+CHDxBOFm+eGYLDfJwYDnA6y/iVhYVOhR3E+GKIwIga3VKKBHcH2dwRaGwy4ckIkdUa7Jhhc/iAGt8RAOQKKETiDJ+rwfCbULUSBH7/sCBYbDE6YqG67QAUS3Ex8gBgLEuP+oaBgIBCDMxYicAbbrAPgJpRVLdHcKJYGwxsm7itkkOW28n9VxiAxxSCnBEEo1GWxomSQEp887wgpOSGwMPFEbp3V+UgrcThe5WbalmDgDQ7UEKBJsUODgUUBkgHvCLroCIyBJ0xUeURI2mumxSZFH4OFr4pSJowcBneyck8vUkfgiyQfC7hkyPSESmM56TXTYsW+j4EiAhQlDRiDIZv7RXSIHYE2DLRI0si4RQZtWJMhksJjAXxm2hQDZd0AF8cSMqhzBgNZvojRobNIblAfMVoiTIxcq3whXJppa2SmxSY+BqoIyAChDjcGG/S2LNqEBHYEi0dLd7SR+C4YVFW+8yTNNGYoxoo9DwN13SAUGk+QQZsxwMHgdIQ+7RxtmiBYGG1MHtW7SFNmGhsLztq4GM9kvirgYXDvzAhs50iLZJG6gSdMVBki+c00HwNVsQEpa3sY0LAX1bzUEcpjsMawafgcVZUhkt9M8zFYkG00n0GZdo4duBd20QD3CZwCWAC9orAPXEf1XOmh446ZxhjYLgOFCELmho8BeSU4MVLpagUqPRC9wBMqq33tiSeeV1fJUIwVKw4DlUMhZOq0Yehwo4RBuJ8AFHt2r4L9oHRnTDmqa2pf9Oh7zDTvWFA5FEJmE+qbUQ8DovDE0nv59rbHbC5IB0VpWXfKY6bFEmOHgcpuQAzam9GWlwFLsoif5B+0RaisNkRyzTQoxXiMFFc/FEIZweBu/SU5jiqGSEpr06SZdpCnfvBDMlBjHDgMznDzHB35GRiGP89Gy8UyQiS/mebxD1QGSLh3nmFgrN8P6/WbbS8GI3+wlBDJMdOurBj30kLqpwPBoOaUHxj3JVmo0F53c5BO4v3xl1IGGY+ZFitJBmqngywxiDoMjLs8QKU47lf6Fi6NQ2ddgEsZHqgtUJRm2qGPgdKVERk0qB+IMhTcL0BlQ+fdIFUuwkBAcMNExeeISTOtCsxbFykWtUPBJAZRUYZCCMrkneB2KQUpXe/B7VSYuKf4Xdi0Yyh+24rVIMuyjWpnRMlAlGDwN4F12jelWLqlxz1311EtKD4kwWumxUaUZ8omlSQVPMp4GBg1kVIgBtxMxN3jtjdMjJwovq3La6bFWmCGQgtMMb/MIM9TCGLfTM6JLXnkeRJuT4ZIat/mkGYaY9CBjOr2kzS+NuYnBnUDaZ/YlHktu9lGoyMcVZV1OExeM23JDBITKr4TGcYybZ5tB0gd8YxAfR0O06lTnVcXuXflygoGVIKxLbMLNB3i5y+MRbITXUf1p+Ljg069ZlodukthwPcLk1sD5z0ny8QY6NJlNzyOqvJz6IWZdkxG0uZSGJjEAPeNVsnAeU8kmmlJ0Cvg+IqGx1FV/kK010yLQkNxaCAYsL2zVfP0A5oOsekeBo6jqrIORzDwmGlRX42qKmWIQZ2XodzLBIufgZUw3FBZZR0OV/9KmCijmKjJUi1Ny5CfGGUVeCK3wJZFfWyJRANFitsiTFRah8Nl/881076BvhwG5CszBkYeZK6dMs+iAsOGe9pHcEdVaR0Ol9dM24IN9QxwacyUGYOOwbKNOmdAGSZRfGDxxHthKQ7KCp1k5jHTIKWegYkMWJ5JlF2xjsCWBN1iZ0nhuBgaHkdVbZKJ1PBU58WgtxwGPcaAsknY5SlS1BPEgP+2DBRAuo6qyjocLsdMK5Kx/Es9gwwyKFLemQJi1lZsOS0JOvMQEAFPuDqOqvqrenxmGpmqqqUhAyrbHgrXDCEUyxgZFsd9ZIATA7Asi5GQjqr6S57NGTNtGQzyUVGGss42yVDpj4uWBT0bIMFTbY6jqrQOhyvkNdPISFIsXBY0jeqR6iL1TsZ6CwCsMXttUFqq0lGNqA+RPGbaljCS1AqnRK0LtahTfsAp3LRuJ4lB+95JMMgwUW0dDpf3VddYhxlJSoVTotagom0vA+fdRvcPpKO6hBBpJQcR11DsqDcQaCjQ1hkZ3K+/IOmoLiFEWgl7zLQlGAg0HbBtIy/BMFz5EbiOqvoQaeXC+6rrpvLNM00HGVmCYdzhVJgo1Vqd+vDmfnv7zn3B1XmVSXEdDtOp91VX9ZtnxoBCZSrBMLZn34xmTO4palhbSpKJMzhxDUX1G0eaDjJjizPAHj9sP40G+emX6WuG+yqT+hDJb6ZtQVktAxYdsDCRylCMu9LoqY3DAMcBSRyHUJrcGMbtuXRQlnC8oq8yTfWmiYYChkglxuCOIkTfCQH5AWeC84HFHVXVdTiCgbcyLWGpZUDRAQ+RWAnGXW2Qnz1pgYJF6aiqrsPhGl+5r7oq3zBoIjxgDDAYrN/c+MbBiDO5N6SjqroOh8sx06g6b6A2WGZDAZdGDA+oBMNoedaDfKkm54Y711FdRojkMdOoOq+lNlhmQ4E5aawEY3o+cESrpggTFdfhcEkz7TyP64LaYJmtClqGVa2zEoy7bTEQbob1p9bAOR9n23VUvy/jtFWvmaY4y5LRnKWRnYJh5EWbEzQO3Llh23AT70u5z68rq/OK9MqzSleVI8BlYTDNYEoJ11FVXYfDJc00/qprSdmEwEMDtizQ686sBIOOQKFx0PGMA5L7KpPqOhwur5lGuyY1HcEhIJYFdhKIMYHJrXfHtM6ZYJgoHFXldThcrpkW44fCLH5GyLoEkIHF33amk0DmDAPcMT3hlinxuMQQyWemsSNR5Mk4i2p/RvMq06QokZ8EYtzgKKiVEtMgLEM6qsrrcLimz437BgvbQGdNU5tSpgviBIjJrbHujANnhSQmkw72EOGoqq7D4fKaaRKCbX6UAh0XNt1+QtAAeRpKcUDlmV45c4PHUVV4Ho5HYVibPjcOl6xm9r0UxGFp85Shm+064lQcqsn1rwaOWobjqC7nQPqLmXPjotGOBaBrbzsyLftC41n7MxrdadeOitORqARDHBtIB+XxHRNn0jYcR3U5FxP4XnWVR9pFW0WcmvSzRjdjhtwT8Z5p+mzbM15hWNRoNHW6vGGwKcVPApn21jkTw3FU1dfhMPnMNHGkHVFoD5x+2rfZSYKNLjYOW2zSOXL0q+lvqdZlajQaZ82mrm+kbLs39pw3m29tRj0Mnp4/Nc9xVJeQZGJyzLS2i4Bj2KRpepBP/Obc3Bc1SeRvS4MRTnbRqEvgdwyeYFl1OD4GzEz7tjmlKBcdk9vusGNFawM6WDSfz7PThfHnPBc7SnRQq4mjROvDofxi8R2m5JyKNo+BcFSVlyo7DB4cBjMI5gL5vV7+NoJB+wUGwlHFEGkpCFZ+STOttfWWdr6r4a9lYIkwcQlJJibHTCuxU6FbI+zv2OGxx5dKop8nXOXdrs86P/b+2qg1arEhQGOAHag7B+UMg+ELDKSjqr4Oh8sx0+br/GBGs9cOzZVV7COyW8I0cmYJiYfKUGbTjFLSUVVfh8MlzLTVCD8q/vh4hzbTrz5en12rckxH1O9G6JD66+rh4cPD5dXV/uPjwcF8OgQHBkiEWUd3d97wgJKNd06YuKS7m4SZRs1e/aDwO+zOHrXPLiApFK5PTqrs8H6kM3uy/Y/ELSVY+BZKholLqMPh0uCjTXcQ7Ow+f9/CXDSFAoKpIhjk4hthhQivw1lCkomU5BuGj2sn8vYbJ2awUH/B7rK21BAJAwRYXQCE4w/fueHFwn+3hDocoTDA7gfvZcJBsCACPhpLSTI5EPb5xSG0LPxuXZjTBd4xCF7FYDkuEtepNncJw1Bgf//q6vLhoVo9OaE7IrCtyImtnzv8MrfV493Z2e6dN69MI9hbVnggdHFB77vn0mkNKr1epVLp98fjX78sa/oakVmdn/98ZKzkzTQIjK6mKbBrmZ4h9HtOkcL3oC6DP6Wq4RlRRX364uLoCEElk/F0KJvNZNjlAnqznLLHs7dbToM6oMsuGagHfoUPB8XubJuHp3AFS1sVZmTPvYdX773K5T49vaAelcsl02lhLJOJ1ESGvT682Ke+fz84eHzkoB7orrKz4G49Nuld/FkG44XNT8gpDb1UKmWT6BKPSp+GXrGIA68vDJtyNsh7n8PQT83Kho0F/j9OnSPS/FJ4/87bNH+RWGzSa/4V8OU/58Lro/SsFhy44yc+p7ONP+Fdz+/Xxfy+9sd0g+UonJzVH3TB75e+9KUvfelLX/rS36f/A6axSVdX3ZUoAAAAAElFTkSuQmCC",
    "https://ih0.redbubble.net/image.389209705.4734/flat,550x550,075,f.u1.jpg",
    "http://www.sciencefriday.com/wp-content/uploads/2016/08/Artboard-1.png"
];

categoriesArray = [9, 12, 18, 21, 26, 27, 11, 14, 22, 19];
triviaSeed = [];
runSeeds = (i) => {
    console.log("we running stuff");

    // We then run the request with axios module on a URL with a JSON
    axios.get("https://opentdb.com/api.php?amount=10&category=" + categoriesArray[i] + "&type=multiple").then(
        function (response) {
            // Then we print out the trivia api data
            console.log("we got stuff")
            // console.log("Response from Trivia API: " + JSON.stringify(response.data.results));
            let results = response.data.results;
            console.log(results[0].category);

            triviaSeed.push(
                {
                    image: imageArr[i],
                    category: results[0].category,
                    questions: [
                        {
                            "question": results[0].question,
                            "answers": results[0].incorrect_answers,
                            "correctAnswer": results[0].correct_answer
                        },
                        {
                            "question": results[1].question,
                            "answers": results[1].incorrect_answers,
                            "correctAnswer": results[1].correct_answer
                        },
                        {
                            "question": results[2].question,
                            "answers": results[2].incorrect_answers,
                            "correctAnswer": results[2].correct_answer
                        },
                        {
                            "question": results[3].question,
                            "answers": results[3].incorrect_answers,
                            "correctAnswer": results[3].correct_answer
                        },
                        {
                            "question": results[4].question,
                            "answers": results[4].incorrect_answers,
                            "correctAnswer": results[4].correct_answer
                        },
                        {
                            "question": results[5].question,
                            "answers": results[5].incorrect_answers,
                            "correctAnswer": results[5].correct_answer
                        },
                        {
                            "question": results[6].question,
                            "answers": results[6].incorrect_answers,
                            "correctAnswer": results[6].correct_answer
                        },
                        {
                            "question": results[7].question,
                            "answers": results[7].incorrect_answers,
                            "correctAnswer": results[7].correct_answer
                        },
                        {
                            "question": results[8].question,
                            "answers": results[8].incorrect_answers,
                            "correctAnswer": results[8].correct_answer
                        },
                        {
                            "question": results[9].question,
                            "answers": results[9].incorrect_answers,
                            "correctAnswer": results[9].correct_answer
                        }
                    ]
                }
            );

            i++;
            if (i === categoriesArray.length) {
                console.log("we're done")
                db.Game
                    .collection.insertMany(triviaSeed)
                    .then(data => {
                        console.log(data.result.n + " records inserted!");
                        process.exit(0);
                    })
                    .catch(err => {
                        console.error(err);
                        process.exit(1);
                    });
            }
            else {
                console.log("running this again")
                runSeeds(i);
            }
        }

    );
}

runSeeds(0);