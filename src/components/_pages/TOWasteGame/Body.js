import React, { Component } from 'react'
import Modal from './Modal'
import Description from './Description'
import ProgressBar from './ProgressBar'

class Body extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // Game
            gameSize: 10,
            gameKeywords: [],
            // Blue Bin
            blueBinKeywords: [],
            // Green Bin
            greenBinKeywords: [],
            // Garbage
            garbageKeywords: [],
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
            progressBarSize: 0,
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
                    resolve(res)
                }).catch((err) => {
                    reject("Error: " + err)
                })
        })

        dataPromise.then((data) => {
            for (let i = 0; data.length > i; i++) {
                let pushIt
                let key = data[i].keywords.split(',');

                for (let j = 0; j < key.length; j++) {
                    if (key[j] !== "") {
                        switch (data[i].category) {
                            case "Blue Bin":
                                pushIt = this.state.blueBinKeywords.concat(key[j].trim())
                                this.setState({ blueBinKeywords: pushIt })
                                break;
                            case "Green Bin":
                                pushIt = this.state.greenBinKeywords.concat(key[j].trim())
                                this.setState({ greenBinKeywords: pushIt })
                                break;
                            case "Garbage":
                                pushIt = this.state.garbageKeywords.concat(key[j].trim())
                                this.setState({ garbageKeywords: pushIt })
                                break;
                            default:
                                break;
                        }
                    }
                }
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
            let keyword = categoryKeywords[this.randomInt(0, categoryKeywords.length)]
            let pushIt = this.state.gameKeywords.concat({
                category: categoryName,
                keyword: keyword,
            })
            this.setState({
                gameKeywords: pushIt
            })
        }
    }

    getGameKeywords() {
        const min = parseInt(this.state.gameSize / 5)
        const max = parseInt(this.state.gameSize / 2)
        const size1 = this.randomInt(min, max)
        const size2 = this.randomInt(min, max)
        const size3 = this.state.gameSize - size1 - size2

        this.insertGameKeywords(this.state.blueBinKeywords, "Blue Bin", size1)
        this.insertGameKeywords(this.state.greenBinKeywords, "Green Bin", size2)
        this.insertGameKeywords(this.state.garbageKeywords, "Garbage", size3)
        // console.log(this.state.gameKeywords)

        let shuffle = this.shuffleGameKeywords(this.state.gameKeywords)
        this.setState({
            gameKeywords: shuffle
        })
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
            progressSize = progressSize + (100 / (this.state.gameSize))
            this.setState({
                progressBarSize: progressSize
            })
        }
    }

    toggleClass(id, idx) {
        this.updateProgressBar(idx)

        const blue = document.querySelector(`#blueBinButton-${idx}`)
        const green = document.querySelector(`#greenBinButton-${idx}`)
        const garbage = document.querySelector(`#garbageButton-${idx}`)

        blue.classList.replace('btn-bluebin', 'btn-bluebin-white')
        green.classList.replace('btn-greenbin', 'btn-greenbin-white')
        garbage.classList.replace('btn-garbage', 'btn-garbage-white')

        switch (id) {
            case "Blue Bin":
                blue.classList.replace('btn-bluebin-white', 'btn-bluebin')
                break;
            case "Green Bin":
                green.classList.replace('btn-greenbin-white', 'btn-greenbin')
                break;
            case "Garbage":
                garbage.classList.replace('btn-garbage-white', 'btn-garbage')
                break;
            default:
                break;
        }

        let newAnswers = this.state.playerAnswers.slice();
        newAnswers[idx] = id

        this.setState({
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
            playerScore: 0,
            isDisabledButton: false,
            isDisabledSubmitButton: true,
            playerAnswers: [],
            progressBarSize: 0,
        })
        this.getDataAPI()
    }

    render() {
        return (
            <div>
                <Description />
                <hr />
                <div class="container">
                    <div class="row">
                        {this.state.gameKeywords.map((obj, index) => {
                            return (
                                <div className="col-md-6 p-3 text-center border-bottom" key={index}>
                                    <h4 className="text-capitalize">{obj.keyword} <i class=""></i></h4>
                                    <button type="button" id={`blueBinButton-${index}`} className='btn btn-bluebin-white mr-2'
                                        onClick={this.toggleClass.bind(this, "Blue Bin", index)}
                                        disabled={this.state.isDisabledButton}>Blue Bin
                                    </button>
                                    <button type="button" id={`greenBinButton-${index}`} className='btn btn-greenbin-white mr-2'
                                        onClick={this.toggleClass.bind(this, "Green Bin", index)}
                                        disabled={this.state.isDisabledButton}>Green Bin
                                    </button>
                                    <button type="button" id={`garbageButton-${index}`} className='btn btn-garbage-white mr-2'
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
                    <ProgressBar size={this.state.progressBarSize} />
                    <div className="pb-3 text-right">
                        <button type="button" className="btn btn-bottom m-2" onClick={this.rerollGameKeywords}>Reroll &amp; Play Again</button>
                        <button type="button" className="btn btn-bottom m-2" onClick={this.finalScore}
                            disabled={this.state.isDisabledSubmitButton} data-toggle="modal" data-target="#ModalScore">
                            Get Results
                        </button>
                    </div>
                </div>

                <Modal title="Score" score={this.state.playerScore} size={this.state.gameSize}>
                    Your score is:
                    <h1>{this.state.playerScore}/{this.state.gameSize}</h1>
                </Modal>
            </div>
        )
    }
}
export default Body