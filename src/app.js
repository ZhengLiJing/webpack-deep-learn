import './css/common.css';
import Layer from './components/layer.js';

const App = () => {
    var dom = document.getElementById('app');
    var layerIns = new Layer();
    dom.innerHTML = layerIns.tpl({
        name: 'zhenglijing',
        array: ['Apple', 'ASUS', 'Lenovo']
    });
}

new App()