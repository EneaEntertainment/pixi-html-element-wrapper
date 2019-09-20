import canvasBounds from './canvas-bounds.js';

/**
 *
 * ElementWrapper
 *
 * @version : 2.0.2
 * @author  : http://www.enea.sk
 *
 * @export
 * @class ElementWrapper
 * @extends {PIXI.DisplayObject}
 */
export default class ElementWrapper extends PIXI.DisplayObject
{
    /**
     * Creates an instance of ElementWrapper.
     *
     * @param {Element} [target=null]
     */
    constructor(target = null)
    {
        super();

        // prevents AccessibilityManager crash
        this.children = [];

        this.target = target;
        this.prevID = -1;

        this._anchorX = 0;
        this._anchorY = 0;
    }

    /**
     *
     * updateTarget
     *
     */
    updateTarget()
    {
        const matrix = this.worldTransform;

        this.target.style.left = `${canvasBounds.x}px`;
        this.target.style.top = `${canvasBounds.y}px`;
        this.target.style.transform = `matrix(${matrix.a}, ${matrix.b}, ${matrix.c}, ${matrix.d}, ${matrix.tx}, ${matrix.ty})`;
    }

    /**
     *
     * render
     *
     */
    render()
    {
        if (this.prevID === this.transform._worldID || this.target === null)
        {
            return;
        }

        this.updateTarget();

        this.prevID = this.transform._worldID;
    }

    /**
     *
     * destroy
     *
     */
    destroy()
    {
        this.target = null;
        this.prevID = null;

        super.destroy();
    }

    /**
     *
     * bounds
     *
     * @readonly
     */
    get bounds()
    {
        return this.target.getBoundingClientRect();
    }

    /**
     *
     * anchorX
     *
     */
    get anchorX()
    {
        return this._anchorX;
    }

    /**
     *
     * anchorX
     *
     * @param {number} value
     */
    set anchorX(value)
    {
        this._anchorX = value;

        this.pivot.x = value * this.bounds.width;
    }

    /**
     *
     * anchorY
     *
     */
    get anchorY()
    {
        return this._anchorY;
    }

    /**
     *
     * anchorY
     *
     * @param {number} value
     */
    set anchorY(value)
    {
        this._anchorY = value;

        this.pivot.y = value * this.bounds.height;
    }

    /**
     *
     * anchorXY
     *
     * @param {number} value
     */
    set anchorXY(value)
    {
        this.anchorX = value;
        this.anchorY = value;
    }
}

ElementWrapper.prototype.renderWebGL = ElementWrapper.prototype.render;
ElementWrapper.prototype.renderCanvas = ElementWrapper.prototype.render;
