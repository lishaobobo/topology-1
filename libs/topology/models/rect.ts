import { Point } from './point';
import { pointInRect } from '../middles/utils';

export class Rect {
  ex: number;
  ey: number;
  center: Point = new Point(0, 0);
  constructor(public x: number, public y: number, public width: number, public height: number) {
    this.x = this.x << 0;
    this.y = this.y << 0;
    this.width = this.width << 0;
    this.height = this.height << 0;
    this.ex = this.x + this.width;
    this.ey = this.y + this.height;
    this.calceCenter();
  }

  clone(): Rect {
    return new Rect(this.x, this.y, this.width, this.height);
  }

  hit(pt: Point, padding = 0) {
    return pt.x > this.x - padding && pt.x < this.ex + padding && pt.y > this.y - padding && pt.y < this.ey + padding;
  }

  hitRect(rect: Rect) {
    return (
      (rect.x > this.x && rect.x < this.ex && rect.y > this.y && rect.y < this.ey) ||
      (rect.ex > this.x && rect.ex < this.ex && rect.y > this.y && rect.y < this.ey) ||
      (rect.ex > this.x && rect.ex < this.ex && rect.ey > this.y && rect.ey < this.ey) ||
      (rect.x > this.x && rect.x < this.ex && rect.ey > this.y && rect.ey < this.ey)
    );
  }

  hitRotate(point: Point, rotate: number, center: Point) {
    const pts = this.toPoints();
    for (const pt of pts) {
      pt.rotate(rotate, center);
    }

    return pointInRect(point, pts);
  }

  calceCenter() {
    this.center.x = (this.x + this.width / 2) << 0;
    this.center.y = (this.y + this.height / 2) << 0;
  }

  toPoints() {
    return [
      new Point(this.x, this.y),
      new Point(this.ex, this.y),
      new Point(this.ex, this.ey),
      new Point(this.x, this.ey)
    ];
  }
}
