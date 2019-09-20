import canvasBounds from './canvas-bounds.js';
import ElementWrapper from './element-wrapper.js';

let bunny;
let wrappedElement;

// init app
const app = new PIXI.Application({
    width           : window.innerWidth,
    height          : window.innerHeight,
    autoDensity     : true,
    backgroundColor : 0x3a7ccd
});

const canvasHolder = document.getElementById('pixi-canvas');

canvasHolder.appendChild(app.view);

// load texture
app.loader.add('bunny', 'https://pixijs.io/examples/examples/assets/bunny.png');
app.loader.load(onTextureLoaded);

function onTextureLoaded(loader, resources)
{
    // create bunny
    bunny = new PIXI.Sprite(resources.bunny.texture);

    bunny.anchor.set(0.5);

    app.stage.addChild(bunny);

    // spin bunny
    app.ticker.add((delta) =>
    {
        bunny.rotation += 0.1 * delta;
    });

    // get element to wrap things around
    const element = document.getElementById('my-element');

    element.addEventListener('submit', shake);

    // create wrapped element
    wrappedElement = new ElementWrapper(element);

    wrappedElement.anchorXY = 0.5;

    app.stage.addChild(wrappedElement);

    // handle window resize
    window.addEventListener('resize', onResize);

    onResize();
}

function shake(e)
{
    e.preventDefault();

    wrappedElement.scale.set(1.1);
    wrappedElement.rotation = Math.random() > 0.5 ? 0.075 : -0.075;

    setTimeout(() =>
    {
        wrappedElement.scale.set(1);
        wrappedElement.rotation = 0;
    }, 100);
}

function onResize()
{
    // resize renderer
    const { innerWidth, innerHeight } = window;

    app.renderer.resize(innerWidth, innerHeight);

    // store canvas bounds
    const rect = app.view.getBoundingClientRect();

    canvasBounds.x = rect.left + (window.scrollX || window.pageXOffset);
    canvasBounds.y = rect.top + (window.scrollY || window.pageYOffset);
    canvasBounds.width = rect.width;
    canvasBounds.height = rect.height;

    // reposition bunny & wrapped element
    bunny.x = canvasBounds.width >> 1;
    bunny.y = (canvasBounds.height >> 1) - (wrappedElement.bounds.height >> 1) - 20;

    wrappedElement.x = canvasBounds.width >> 1;
    wrappedElement.y = (canvasBounds.height >> 1) + 20;
}
