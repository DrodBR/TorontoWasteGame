import React, { useState, useEffect } from 'react'
import Modal from './Modal'
import Description from './Description'
import ProgressBar from './ProgressBar'

const Body = () => {

    // eslint-disable-next-line no-unused-vars
    const [gameSize, setGameSize] = useState(10)
    const [gameKeywords, setGameKeywords] = useState([])

    const [completeData, setCompleteData] = useState([])
    const [blueBinKeywords, setBlueBinKeywords] = useState([])
    const [greenBinKeywords, setGreenBinKeywords] = useState([])
    const [garbageKeywords, setGarbageKeywords] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [playerAnswers, setPlayerAnswers] = useState([])
    const [scoredOrNot, setScoreOrNot] = useState([])
    const [phrase, setPhrase] = useState([])
    const [phraseIcon, setPhraseIcon] = useState([])
    const [playerScore, setPlayerScore] = useState(0)

    const [isDisabledButton, setIsDisabledButton] = useState(false)
    const [isDisabledSubmitButton, setIsDisabledSubmitButton] = useState(true)

    const [progressBarSize, setProgressBarSize] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000")
            const data = await response.json()
            setCompleteData(data)
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (completeData.length > 0) {
            defineSelectedKeywords()
        }
    }, [completeData])

    useEffect(() => {
        if (blueBinKeywords.length > 0 && greenBinKeywords.length > 0 && garbageKeywords.length > 0) {
            selectGameKeywords()
        }
    }, [blueBinKeywords, greenBinKeywords, garbageKeywords])

    const defineSelectedKeywords = () => {
        setBlueBinKeywords(splitData("Blue Bin"))
        setGreenBinKeywords(splitData("Green Bin"))
        setGarbageKeywords(splitData("Garbage"))
    }

    const splitData = kind => {

        const kindValidGroup = completeData.filter(data => data.category === kind && data.keyword !== "")
        const kindSplitted = kindValidGroup.map(data => data.keywords.split(','))
        const kindOrganized = kindSplitted.reduce((prev, curr) => prev.concat(curr))

        return kindOrganized
    }

    const randomInt = (min, max) => {
        return parseInt(Math.random() * (+max - +min) + +min)
    }

    const insertGameKeywords = (categoryKeywords, categoryName, size) => {
        for (let i = 0; size > i; i++) {
            let keyword = categoryKeywords[randomInt(0, categoryKeywords.length)]
            setGameKeywords(gameKeywords.push({
                category: categoryName,
                keyword: keyword,
            }))
        }
    }

    const selectGameKeywords = () => {
        const min = parseInt(gameSize / 5)
        const max = parseInt(gameSize / 2)
        const size1 = randomInt(min, max)
        const size2 = randomInt(min, max)
        const size3 = gameSize - size1 - size2

        insertGameKeywords(blueBinKeywords, "Blue Bin", size1)
        insertGameKeywords(greenBinKeywords, "Green Bin", size2)
        insertGameKeywords(garbageKeywords, "Garbage", size3)

        let shuffle = shuffleGameKeywords(gameKeywords)
        setGameKeywords(shuffle)
        setIsLoading(false)
    }

    const shuffleGameKeywords = (array) => {
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

    const finalScore = () => {
        let newScore = 0
        let newScoredOrNot = scoredOrNot
        let newPhrase = phrase
        let newPhraseIcon = phraseIcon

        for (let i = 0; i < gameSize; i++) {
            if (gameKeywords[i].category === playerAnswers[i]) {
                newScore++
                newScoredOrNot[i] = true;
                newPhrase[i] = "Correct";
                newPhraseIcon[i] = "far fa-check-circle";
            } else {
                newScoredOrNot[i] = false;
                newPhrase[i] = gameKeywords[i].category;
                newPhraseIcon[i] = "far fa-times-circle";
            }
        }

        setPlayerScore(newScore)
        setScoreOrNot(newScoredOrNot)
        setPhrase(newPhrase)
        setPhraseIcon(newPhraseIcon)

        disableButton()
    }

    const updateProgressBar = (index) => {
        if (typeof playerAnswers[index] === 'undefined') {
            let progressSize = progressBarSize
            progressSize = progressSize + (100 / (gameSize))
            setProgressBarSize(progressSize)
        }
    }

    const toggleClass = (id, idx) => {
        updateProgressBar(idx)

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

        let newAnswers = playerAnswers.slice();
        newAnswers[idx] = id

        setPlayerAnswers(newAnswers)

        checkIfPlayedAll()
    }

    const checkIfPlayedAll = () => {

        const count = playerAnswers.filter(v => v !== 'undefined')

        if (count.length === (gameKeywords.length - 1))
            disableSubmitButton(false)
    }

    const disableButton = () => {
        setIsDisabledButton(true)
    }

    const disableSubmitButton = (status) => {
        setIsDisabledSubmitButton(status)
    }

    const rerollGameKeywords = () => {
        setIsLoading(true)
        setGameKeywords([])
        setPlayerScore(0)
        setIsDisabledButton(false)
        setIsDisabledSubmitButton(true)
        setPlayerAnswers([])
        setProgressBarSize(0)
        defineSelectedKeywords()
    }

    const gameTable = (
        <div className="row">
            {gameKeywords.map((obj, index) => {
                return (
                    <div className="col-md-6 p-3 text-center border-bottom" key={index}>
                        <h4 className="text-capitalize">{obj.keyword} </h4>
                        <button type="button" id={`blueBinButton-${index}`}
                            className='btn btn-bluebin-white mr-2'
                            onClick={toggleClass.bind(this, "Blue Bin", index)}
                            disabled={isDisabledButton}>Blue Bin
                        </button>
                        <button type="button" id={`greenBinButton-${index}`}
                            className='btn btn-greenbin-white mr-2'
                            onClick={toggleClass.bind(this, "Green Bin", index)}
                            disabled={isDisabledButton}>Green Bin
                        </button>
                        <button type="button" id={`garbageButton-${index}`}
                            className='btn btn-garbage-white mr-2'
                            onClick={toggleClass.bind(this, "Garbage", index)}
                            disabled={isDisabledButton}>Garbage
                        </button>
                        <div className={!isDisabledButton ? 'p-3 d-none' : 'p-3'}>
                            <div className={!scoredOrNot[index] ? 'text-danger' : ''}>
                                <i class={phraseIcon[index]}></i> {phrase[index]}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )

    const content = (
        <div>
            <Description />
            <hr />
            <div className="container">
                {isLoading ? 'Game is Loading!' : gameTable}
                <hr />
                <ProgressBar size={progressBarSize} />
                <div className="pb-3 text-right">
                    <button type="button" className="btn btn-bottom m-2" onClick={rerollGameKeywords}>Reroll &amp; Play Again</button>
                    <button type="button" className="btn btn-bottom m-2" onClick={finalScore}
                        disabled={isDisabledSubmitButton} data-toggle="modal" data-target="#ModalScore">
                        Get Results
                    </button>
                </div>
            </div>

            <Modal title="Score" score={playerScore} size={gameSize}>
                Your score is:
                    <h1>{playerScore}/{gameSize}</h1>
            </Modal>
        </div>
    )

    return content
}
export default Body