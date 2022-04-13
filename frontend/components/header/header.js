import style from "./header.module.css";
import Link from "next/link"

export default function Header(){
    return(
        <div className={style.header}>
        <div className={style.title}>terug gejorist</div>
        <Link href="https://github.com/buurmanEnBuurman/dumpert"><div className={style.sourcecode}>bron code</div></Link>
        </div>
    )
}