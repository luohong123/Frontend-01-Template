/*
 * @Author: lh
 * @Date: 2020-07-29 23:36:13
 * @LastEditors: lh
 * @LastEditTime: 2020-07-29 23:40:21
 * @Description: 
 * @email: 3300536651@qq.com
 */ 
import { Animation, TimeLine } from "./animation";
import { ease } from "./cubicBezier";
export class Carousel {
  constructor(config) {
    this.children = [];
    this.attribute = new Map();
    this.properties = new Map();
  }

  setAttribute(name, value) {
    this[name] = value;
  }

  appendChild(child) {
    this.children.push(child);
  }

  render() {
    let position = 0;
    let timeline = new TimeLine();
    timeline.start();

    let nextPicStopHandler = null;

    const children = this.data.map((url, currentPosition) => {
      const nextPosition = (currentPosition + 1) % this.data.length;
      const lastPosition =
        (currentPosition - 1 + this.data.length) % this.data.length;

      let offset = 0;

      let onStart = () => {
        timeline.pause();
        clearTimeout(nextPicStopHandler);

        const currentElement = children[currentPosition];

        const currentTransformValue = Number(
          currentElement.style.transform.match(/translateX\(([\s\S]+)px\)/)[1]
        );
        offset = currentTransformValue + 500 * currentPosition;
      };

      let onPan = (event) => {
        const currentTransformValue = 500 * currentPosition + offset + dx;
        const nextTransformValue = 500 - 500 * nextPosition + offset + dx;
        const lastTransformValue = -500 - 500 * lastPosition + offset + dx;
        const dx = event.clientX - event.startX;

        const currentElement = children[currentPosition];
        const nextElement = children[nextPosition];
        const lastElement = children[lastPosition];

        currentElement.style.transform = `translateX(${currentTransformValue}px)`;
        nextElement.style.transform = `translateX(${nextTransformValue}px)`;
        lastElement.style.transform = `translateX(${lastTransformValue}px)`;
      };

      let onPanend = (event) => {
        let direction = 0;
        const dx = event.clientX - event.startX;
        if (dx + offset > 250) {
          direction = 1; // 往右拖动
        } else if (dx + offset < -250) {
          direction = -1; // 往左拖动
        }
        timeline.reset();
        timeline.start();

        const currentElement = children[currentPosition];
        const nextElement = children[nextPosition];
        const lastElement = children[lastPosition];

        const currentTransformValue = 500 * currentPosition + offset + dx;
        const nextTransformValue = 500 - 500 * nextPosition + offset + dx;
        const lastTransformValue = -500 - 500 * lastPosition + offset + dx;
        const currentAnimation = new Animation(
          currentElement.style,
          "transform",
          (v) => `translateX(${v}px)`,
          currentTransformValue,
          -500 * currentPosition + direction * 500,
          500,
          0,
          ease
        );
        const nextAnimation = new Animation(
          nextElement.style,
          "transform",
          (v) => `translateX(${v}px)`,
          nextTransformValue,
          500 - 500 * nextPosition + direction * 500,
          500,
          0,
          ease
        );
        const lastAnimation = new Animation(
          lastElement.style,
          "transform",
          (v) => `translateX(${v}px)`,
          lastTransformValue,
          -500 - 500 * lastPosition + direction * 500,
          500,
          0,
          ease
        );

        timeline.add(currentAnimation);
        timeline.add(nextAnimation);
        timeline.add(lastAnimation);

        position = (position - direction + this.data.length) % this.data.length;
        nextPicStopHandler = setTimeout(nextPic, 3000);
      };

      const element = (
        <img
          src={url}
          draggable="false"
          onStart={onStart}
          onPan={onPan}
          onPanend={onPanend}
          enableGesture={true}
        />
      );
      element.style.transform = "translateX(0px)";
      element.addEventListener("dragstart", (e) => e.preventDefault());
      return element;
    });
    const root = <div class="carousel">{children}</div>;

    let nextPic = () => {
      const nextPosition = (position + 1) % this.data.length;
      const current = children[position];
      const next = children[nextPosition];

      const currentAnimation = new Animation(
        current.style,
        "transform",
        (v) => `translateX(${5 * v}px)`,
        -100 * position,
        -100 - 100 * position,
        500,
        0,
        ease
      );
      const nextAnimation = new Animation(
        next.style,
        "transform",
        (v) => `translateX(${5 * v}px)`,
        100 - 100 * nextPosition,
        -100 * nextPosition,
        500,
        0,
        ease
      );

      timeline.add(currentAnimation);
      timeline.add(nextAnimation);

      position = nextPosition;

      nextPicStopHandler = setTimeout(nextPic, 3000);
    };
    nextPicStopHandler = setTimeout(nextPic, 3000);

    root.addEventListener("mousedown", (event) => {
      let startX = event.clientX;
      const nextPosition = (position + 1) % this.data.length;
      const lastPosition = (position - 1 + this.data.length) % this.data.length;

      const current = children[position];
      const next = children[nextPosition];
      const last = children[lastPosition];

      current.style.transition = "ease 0s";
      next.style.transition = "ease 0s";
      last.style.transition = "ease 0s";

      current.style.transform = `translateX(${-500 * position}px)`;
      next.style.transform = `translateX(${-500 - 500 * nextPosition}px)`;
      last.style.transform = `translateX(${500 - 500 * lastPosition}px)`;

      let move = (event) => {
        current.style.transform = `translateX(${
          event.clientX - startX - 500 * position
        }px)`;
        next.style.transform = `translateX(${
          event.clientX - startX + 500 - 500 * nextPosition
        }px)`;
        last.style.transform = `translateX(${
          event.clientX - startX - 500 - 500 * lastPosition
        }px)`;
      };
      let up = (event) => {
        let offset = 0;
        if (event.clientX - startX > 250) {
          offset = 1; // 往右拖动
        } else if (event.clientX - startX < -250) {
          offset = -1; // 往左拖动
        }

        current.style.transition = "";
        next.style.transition = "";
        last.style.transition = "";

        current.style.transform = `translateX(${
          offset * 500 - 500 * position
        }px)`;
        next.style.transform = `translateX(${
          offset * 500 + 500 - 500 * nextPosition
        }px)`;
        last.style.transform = `translateX(${
          offset * 500 - 500 - 500 * lastPosition
        }px)`;

        position = (position - offset + this.data.length) % this.data.length;
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
      };
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    });

    return root;
  }

  mountTo(parent) {
    this.render().mountTo(parent);
  }
}