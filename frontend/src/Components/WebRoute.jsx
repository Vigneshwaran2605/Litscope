import React, { useEffect, useState } from 'react';
import { Button, Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react';

function InputFront(props){
    let [text, setText] = useState("");
    
    return (
        <div  className={`' flex w-fit resize-none flex-grow  border-r ${(props.index===0)?"rounded-l-xl":""}'`}>
            <input type="text" style={{width:`${text.length*8}px`}} onChange={(e) => {
                setText(e.target.value);
                props.onChange(e.target.value,props.index)
            }} className={` min-w-[30px] text-center rounded-none ${(props.index===0)?"rounded-l-xl":""}`} ></input>
        </div>
    )
}

function InputBack(props){
    let [text, setText] = useState("");
    return (
        <div  className={` flex w-fit resize-none flex-grow  `}>
            <input type="text" style={{width:`${text.length*8}px`}} onChange={(e) => {
                setText(e.target.value);
                props.onChange(e.target.value,props.index)
            }} className={` min-w-[30px] text-center border-r rounded-none `} ></input>
        </div>
    )
}

function WebRoute(props) {
    let [front, setFront] = useState([]);
    let [back, setBack] = useState([]);
    let [fronttext, setFronttext] = useState([]);
    let [backtext, setBacktext] = useState([]);
    let [intext, setIntext] = useState("");

    let updatefront= (str, index)=>{
        let temp = fronttext
        temp[index] = str;
        setFronttext(temp);
        update()
    }

    let updateback= (str, index)=>{
        let temp = backtext;
        temp[index] = str;
        setBacktext(temp);
        update()
    }

    let update = () =>{
        props.onChange(fronttext.concat("//<<for>>//").concat(backtext).concat(intext))
    }

    useEffect(update,[intext])

    

    let addFrount = () => {
        setFront(front.concat(<InputFront index = {front.length} onChange={updatefront} className={` w-fit min-w-0 ${(front.length===0)?"rounded-l-xl":""}`} />))
        setFronttext(fronttext.concat(""));
    };

    let addBack = () => {
        setBack(back.concat(<InputBack index = {back.length} onChange={updateback} className={` w-fit min-w-0`} />))
        setBacktext(backtext.concat(""));
    };
    return (
        <div className=' rounded-xl flex flex-row border '>
            {front}
            <Button variant="text" className={` rounded-none ${(front.length===0)?"rounded-l-xl":""}`} onClick={addFrount}>+</Button>
            <div className='p-3 border'>
                {"//<<for>>//"}
            </div>
            {back}
            <Button variant="text" className=' rounded-none' onClick={addBack}>+</Button>
            <Menu>
      <MenuHandler>
        <Button className=' rounded-none rounded-r-xl' variant="gradient">{(intext==="")?"Select Element":intext}</Button>
      </MenuHandler>
      <MenuList>
        <MenuItem value="//<<href>>//"  onClick={(e)=>{
                setIntext(e.target.value)
                }
            }>Href</MenuItem>
        <MenuItem value="//<<text>>//" onClick={(e)=>{
                setIntext(e.target.value)
                }
            }>Text</MenuItem>
      </MenuList>
    </Menu>
        </div>
    );
}

export default WebRoute;