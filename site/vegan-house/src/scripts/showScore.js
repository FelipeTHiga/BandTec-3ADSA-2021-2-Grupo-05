import star from '../assets/images/star.png'
import halfStar from '../assets/images/half-star.png'

export function ShowStars(score) {

    if (score <= 0.5) {
        return (
            <>
                <img src={halfStar} />
            </>
        )

    } else if (score <= 1) {
        return (
            <>
                <img src={star} />
            </>
        )

    } else if (score <= 1.5) {
        return (
            <>
                <img src={star} />
                <img src={halfStar} />
            </>
        )

    }
    else if (score <= 2) {
        return (
            <>
                <img src={star} />
                <img src={star} />
            </>
        )

    } else if (score <= 2.5) {
        return (
            <>
                <img src={star} />
                <img src={star} />
                <img src={halfStar} />
            </>
        )
    } else if (score <= 3) {
        return (
            <>
                <img src={star} />
                <img src={star} />
                <img src={star} />
            </>
        )
    } else if (score <= 3.5) {
        return (
            <>
                <img src={star} />
                <img src={star} />
                <img src={star} />
                <img src={halfStar} />
            </>
        )
    } else if (score <= 4) {
        return (
            <>
                <img src={star} />
                <img src={star} />
                <img src={star} />
                <img src={star} />
            </>
        )
    } else if (score <= 4.5) {
        return (
            <>
                <img src={star} />
                <img src={star} />
                <img src={star} />
                <img src={star} />
                <img src={halfStar} />
            </>
        )
    } else {
        return (
            <>
                <img src={star} />
                <img src={star} />
                <img src={star} />
                <img src={star} />
                <img src={star} />
            </>
        )
    }
}