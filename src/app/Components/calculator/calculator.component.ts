import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, DragDropModule],
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent {

  isOpen = false;
  isResizing = false;
  width = 300;
  height = 400;
  lastMouseX = 0;
  lastMouseY = 0;
  top = 100;
  left = 100;

  @ViewChild('calcBox') calcBox!: ElementRef;

  // Position at center after view initializes
  ngAfterViewInit(): void {
    if (this.isOpen) {
      this.centerCalculator();
    }
  }

  startResizing(event: MouseEvent) {
    this.isResizing = true;
    this.lastMouseX = event.clientX;
    this.lastMouseY = event.clientY;
    event.preventDefault();
  }

  @HostListener('document:mousemove', ['$event'])
  resize(event: MouseEvent) {
    if (!this.isResizing) return;
    const dx = event.clientX - this.lastMouseX;
    const dy = event.clientY - this.lastMouseY;
    this.width = Math.max(250, this.width + dx);
    this.height = Math.max(250, this.height + dy);
    this.lastMouseX = event.clientX;
    this.lastMouseY = event.clientY;
  }

  @HostListener('document:mouseup')
  stopResizing() {
    this.isResizing = false;
  }

  openCalculator() {
    this.isOpen = true;

    // Wait a tick to ensure DOM is rendered
    setTimeout(() => {
      this.centerCalculator();
    });
  }

  centerCalculator() {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    this.left = (viewportWidth - this.width) / 2;
    this.top = (viewportHeight - this.height) / 2;
  }
}
