import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Note, Tag } from "../types"
import {  Link } from "react-router-dom";
import ReactSelect from "react-select";
import Card from "../components/Card";
import { useState } from "react";
//  
type Props={
    notes:Note[];
    availableTags:Tag[];
}
const Main = ({notes,availableTags}:Props) => {
    const [title,setTitle]=useState<string>("");
    const[selectedTags,setSelectedTags]=useState<Tag[]>([])
  // inputa göre filtreleme
  const filtredNotes= notes.filter((note)=>
    note.title.toLowerCase().includes(title.toLowerCase())&&
    selectedTags.every((s_tag)=>note.tags.some(note_tag=>
        note_tag.value===s_tag.value
    )))
  

    return (
    <div className="container mx-auto py-5">

{/*üst kısım */}
<Stack direction="horizontal" className="justify-content-between mb-4">
    <h1 className="d-flez gap-3 align-items-center">
        <img src="/note_logo.png" width={45} />
        <span>Notlar</span>
    </h1>
    <Link to="/new">
    <Button>Oluştur</Button>
    </Link>
</Stack>
{/*form kısmı */}
<Form>
    <Row>
        <Col>
        <Form.Group>
            <Form.Label>Başlığa Göre Ara..</Form.Label>
            <Form.Control onChange={(e)=>setTitle(e.target.value)}/>
            </Form.Group></Col>
        <Col>
        <Form.Group>
            <Form.Label>Etikete Göre Ara..</Form.Label>
           <ReactSelect onChange={(all_tags)=>setSelectedTags(all_tags as Tag[])}
            isMulti options={availableTags}
           className="text-black"/>
            </Form.Group></Col>
    </Row>
</Form>
{/*not listesi */}
<Row xs={1} sm={2}  lg={3} xl={4} className="mt-4 g-4">
    {filtredNotes.map((note)=>(
        <Col key={note.id}>
        <Card note={note} />
        </Col>
    ))}
</Row>
    </div>
  )
}

export default Main