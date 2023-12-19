import { useEffect, useRef, useState } from "react"

export default function About(){
    const aboutRef = useRef(null);

    const [ toggleDialog, setToggleDialog ] = useState(false)

    const closeDialog = () => {
        aboutRef.current.close()
        setToggleDialog(false)
    }

    useEffect(() => {
        if(toggleDialog){
            aboutRef.current.show()
        }else{
            aboutRef.current.close()
        }
    }, [toggleDialog]);

    return(
        <div className="about__project">
            <button className={`btn btn__about ${toggleDialog ? 'toggle' : ''}`} onClick={() => setToggleDialog(prev => !prev)}>&#10097;</button>

            <dialog ref={aboutRef} className='dialog__about'>
                <div className='dialog__about__content'>
                    <button className='btn btn__close' onClick={closeDialog}>X</button>
                    <div className='about__content'>
                        <h4>About this To Do App!</h4>
                        <ul>
                            <li>
                                <h6>This app uses React Hooks:</h6>
                                <ul>
                                    <li>useState Hook</li>
                                    <li>useEffect Hook</li>
                                    <li>useRef Hook</li>
                                </ul>
                            </li>
                            <li>
                                <h6>This app uses React Hooks:</h6>
                                <ul>
                                    <li>uuid</li>
                                    <li>react-icons</li>
                                </ul>
                            </li>
                            <li>
                                <h6>This app uses React Hooks:</h6>
                                <ul>
                                    <li>Vanilla CSS</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </dialog>
        </div>
    )
}