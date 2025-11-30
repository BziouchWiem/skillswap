import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'starRating',
  standalone: false
})
export class StarRatingPipe implements PipeTransform {

  transform(level: number, maxStars: number = 5): string {
    if (level < 0 || level > maxStars) {
      level = Math.max(0, Math.min(maxStars, level));
    }

    const fullStars = Math.floor(level);
    const hasHalfStar = level % 1 >= 0.5;
    const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);

    let stars = '★'.repeat(fullStars);
    
    if (hasHalfStar) {
      stars += '⯨'; // Half star
    }
    
    stars += '☆'.repeat(emptyStars);

    return stars;
  }

}

