// ALT + SHIFT + F
// TODO: Void blank keywords

import React, { Component } from 'react'
import TOWasteGameModal from './TOWasteGameModal'
import TOWasteGameDescription from './TOWasteGameDescription'

class TOWasteGameBody extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // All Data
            TOW: [],
            gameSize: 10,
            // Blue Bin
            blueBinData: [],
            blueBinKeywords: [],
            blueBinClass: [],
            // Green Bin
            greenBinData: [],
            greenBinKeywords: [],
            greenBinClass: [],
            // Garbage
            garbageData: [],
            garbageKeywords: [],
            garbageClass: [],
            // Selected Game Keywords
            gameKeywords: [],
            // Player Answers
            playerAnswers: [],
            scoredOrNot: [],
            phrase: [],
            phraseIcon: [],
            playerScore: 0,
            // control buttons
            isDisabledButton: false,
            isDisabledSubmitButton: true,
            // progress bar
            progressBarSize: 10,
            progressBarStyleBase: "progress-bar progress-bar-striped2 bg-progress w-",
            progressBarStyleUpdated: "progress-bar progress-bar-striped2 bg-progress w-00"
        }
        this.toggleClass = this.toggleClass.bind(this)
        this.finalScore = this.finalScore.bind(this)
        this.rerollGameKeywords = this.rerollGameKeywords.bind(this)
    }

    getDataAPI() {
        const dataPromise = new Promise((resolve, reject) => {
            fetch("https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000")
                .then(res => res.json())
                .then(res => {
                    this.setState({
                        TOW: res
                    });
                    resolve(res)
                    // console.log("Got Toronto Waste Data.")
                }).catch((err) => {
                    reject("Error: " + err)
                })
        })

        dataPromise.then((data) => {
            for (let i = 0; data.length > i; i++) {

                // Get Blue Bin data
                if (data[i].category === "Blue Bin") {
                    let pushIt = this.state.blueBinData.concat(data[i])
                    this.setState({
                        blueBinData: pushIt
                    })
                }

                // Get Green Bin data
                if (data[i].category === "Green Bin") {
                    let pushIt = this.state.greenBinData.concat(data[i])
                    this.setState({
                        greenBinData: pushIt
                    })
                }

                // Get Garbage data
                if (data[i].category === "Garbage") {
                    let pushIt = this.state.garbageData.concat(data[i])
                    this.setState({
                        garbageData: pushIt
                    })
                }
            }

            // Blue Bin Keywords
            for (let i = 0; this.state.blueBinData.length > i; i++) {
                let key = this.state.blueBinData[i].keywords.split(',')
                let pushIt = this.state.blueBinKeywords.concat(key)
                this.setState({
                    blueBinKeywords: pushIt
                })
            }

            // Green Bin Keywords
            for (let i = 0; this.state.greenBinData.length > i; i++) {
                let key = this.state.greenBinData[i].keywords.split(',')
                let pushIt = this.state.greenBinKeywords.concat(key)
                this.setState({
                    greenBinKeywords: pushIt
                })
            }

            // Garbage Keywords
            for (let i = 0; this.state.garbageData.length > i; i++) {
                let key = this.state.garbageData[i].keywords.split(',')
                let pushIt = this.state.garbageKeywords.concat(key)
                this.setState({
                    garbageKeywords: pushIt
                })
            }
            this.getGameKeywords()

        }).catch((err) => {
            console.log(err)
        })
    }

    componentDidMount() {
        this.getDataAPI()
    }

    randomInt(min, max) {
        return parseInt(Math.random() * (+max - +min) + +min)
    }

    insertGameKeywords(categoryKeywords, categoryName, size) {
        for (let i = 0; size > i; i++) {
            let keyword
            let emptyKeyword = true

            do {
                keyword = categoryKeywords[this.randomInt(0, categoryKeywords.length)]
                if (keyword !== " ") {
                    emptyKeyword = false
                }
            } while (emptyKeyword === true)

            let pushIt = this.state.gameKeywords.concat({
                category: categoryName,
                keyword: keyword.trim(),
            })
            this.setState({
                gameKeywords: pushIt
            })
        }
    }

    getGameKeywords() {
        let min = 2
        let max = 5
        let size1 = this.randomInt(min, max)
        let size2 = this.randomInt(min, max)
        let size3 = this.state.gameSize - size1 - size2

        this.insertGameKeywords(this.state.blueBinKeywords, "Blue Bin", size1)
        this.insertGameKeywords(this.state.greenBinKeywords, "Green Bin", size2)
        this.insertGameKeywords(this.state.garbageKeywords, "Garbage", size3)
        // console.log(this.state.gameKeywords)

        let shuffle = this.shuffleGameKeywords(this.state.gameKeywords)
        this.setState({
            gameKeywords: shuffle
        })

        for (let i = 0; i < this.state.gameSize; i++) {
            let pushTrue = this.state.blueBinClass.concat(true)
            this.setState({
                blueBinClass: pushTrue,
                greenBinClass: pushTrue,
                garbageClass: pushTrue
            })
        }
    }

    shuffleGameKeywords(array) {
        let size = array.length
        let tempArray
        let index

        while (size > 0) {
            index = parseInt(Math.random() * size);
            size--
            tempArray = array[size]
            array[size] = array[index]
            array[index] = tempArray
        }
        return array
    }

    finalScore() {
        let newScore = 0
        let newScoredOrNot = this.state.scoredOrNot
        let newPhrase = this.state.phrase
        let newPhraseIcon = this.state.phraseIcon

        for (let i = 0; i < this.state.gameSize; i++) {
            if (this.state.gameKeywords[i].category === this.state.playerAnswers[i]) {
                newScore++
                newScoredOrNot[i] = true;
                newPhrase[i] = "Correct";
                newPhraseIcon[i] = "far fa-check-circle";
            } else {
                newScoredOrNot[i] = false;
                newPhrase[i] = this.state.gameKeywords[i].category;
                newPhraseIcon[i] = "far fa-times-circle";
            }
        }

        this.setState({
            playerScore: newScore,
            scoredOrNot: newScoredOrNot,
            phrase: newPhrase,
            phraseIcon: newPhraseIcon
        })
        // console.log(this.state.scoredOrNot)
        // console.log(this.state.phrase)
        this.disableButton()
    }

    updateProgressBar(index) {

        if (typeof this.state.playerAnswers[index] === 'undefined') {
            let progressSize = this.state.progressBarSize
            progressSize = progressSize + (100/(this.state.gameSize))
            this.setState({
                progressBarSize: progressSize
            })

            let progressStyle = this.state.progressBarStyleBase
            progressStyle = progressStyle + this.state.progressBarSize

            this.setState({
                progressBarStyleUpdated: progressStyle
            })
        }
    }

    toggleClass(id, idx) {

        this.updateProgressBar(idx)

        let newBlue = this.state.blueBinClass.slice();
        let newGreen = this.state.greenBinClass.slice();
        let newGarbage = this.state.garbageClass.slice();
        let newAnswers = this.state.playerAnswers.slice();

        if (id === "Blue Bin") {
            newBlue[idx] = false
            newGreen[idx] = true
            newGarbage[idx] = true
            newAnswers[idx] = "Blue Bin"
        }

        if (id === "Green Bin") {
            newBlue[idx] = true
            newGreen[idx] = false
            newGarbage[idx] = true
            newAnswers[idx] = "Green Bin"
        }

        if (id === "Garbage") {
            newBlue[idx] = true
            newGreen[idx] = true
            newGarbage[idx] = false
            newAnswers[idx] = "Garbage"
        }

        this.setState({
            blueBinClass: newBlue,
            greenBinClass: newGreen,
            garbageClass: newGarbage,
            playerAnswers: newAnswers
        })

        this.checkIfPlayedAdd()
    }

    checkIfPlayedAdd() {
        let count = 0

        for (let i = 0; i < this.state.gameKeywords.length; i++) {
            if (typeof this.state.playerAnswers[i] !== 'undefined') {
                count++
            }
        }

        if (count === (this.state.gameKeywords.length - 1)) {
            this.disableSubmitButton(false)
        }
    }

    disableButton() {
        this.setState({
            isDisabledButton: true
        })
    }

    disableSubmitButton(status) {
        this.setState({
            isDisabledSubmitButton: status
        })
    }

    rerollGameKeywords() {
        this.setState({
            gameKeywords: [],
            blueBinClass: [],
            greenBinClass: [],
            garbageClass: [],
            playerScore: 0,
            isDisabledButton: false,
            isDisabledSubmitButton: true,
            playerAnswers: [],
            progressBarSize: 10,
            progressBarStyleUpdated: "progress-bar progress-bar-striped2 bg-progress w-00"
        })
        this.getDataAPI()
    }

    render() {
        return (
            <div>
                <TOWasteGameDescription />
                <hr />
                <div class="container">
                    <div class="row">
                        {this.state.gameKeywords.map((obj, index) => {
                            return (
                                <div className="col-md-6 p-3 text-center border-bottom" key={index}>
                                    <h4 className="text-capitalize">{obj.keyword} <i class=""></i></h4>
                                    <button type="button" className={this.state.blueBinClass[index] ?
                                        'btn btn-bluebin-white mr-2' : 'btn btn-bluebin mr-2'}
                                        onClick={this.toggleClass.bind(this, "Blue Bin", index)}
                                        disabled={this.state.isDisabledButton}>Blue Bin
                                    </button>
                                    <button type="button" className={this.state.greenBinClass[index] ?
                                        'btn btn-greenbin-white mr-2' : 'btn btn-greenbin mr-2'}
                                        onClick={this.toggleClass.bind(this, "Green Bin", index)}
                                        disabled={this.state.isDisabledButton}>Green Bin
                                    </button>
                                    <button type="button" className={this.state.garbageClass[index] ?
                                        'btn btn-garbage-white mr-2' : 'btn btn-garbage mr-2'}
                                        onClick={this.toggleClass.bind(this, "Garbage", index)}
                                        disabled={this.state.isDisabledButton}>Garbage
                                    </button>
                                    <div className={!this.state.isDisabledButton ? 'p-3 d-none' : 'p-3'}>
                                        <div className={!this.state.scoredOrNot[index] ? 'text-danger' : ''}>
                                        <i class={this.state.phraseIcon[index]}></i> {this.state.phrase[index]}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <hr />
                    <div className="py-3">
                        <div class="progress">
                            <div class={this.state.progressBarStyleUpdated}
                                role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
                            </div>
                        </div>
                    </div>
                    <div className="pb-3 text-right">
                        <button type="button" className="btn btn-bottom m-2" onClick={this.rerollGameKeywords}>Reroll &amp; Play Again</button>
                        <button type="button" className="btn btn-bottom m-2" onClick={this.finalScore}
                            disabled={this.state.isDisabledSubmitButton} data-toggle="modal" data-target="#ModalScore">
                            Get Results
                        </button>
                    </div>
                </div>

                <TOWasteGameModal title="Score" score={this.state.playerScore} size={this.state.gameSize}>
                    Your score is:
                    <h1>{this.state.playerScore}/{this.state.gameSize}</h1>
                </ TOWasteGameModal>
            </div>
        )
    }
}
export default TOWasteGameBody  