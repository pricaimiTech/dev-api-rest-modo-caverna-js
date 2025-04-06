export default function getIndex(objeto, id) {
    return objeto.findIndex((item) => {
        return item.id === parseInt(id);
    })
}