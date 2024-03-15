class CardUtils {

    removeCVV(cardData: any) {
        const cardDataWithoutCVV = {...cardData }
        delete cardDataWithoutCVV.cvv
        delete cardDataWithoutCVV.iat
        delete cardDataWithoutCVV.exp
        return cardDataWithoutCVV
    }
}

export default new CardUtils