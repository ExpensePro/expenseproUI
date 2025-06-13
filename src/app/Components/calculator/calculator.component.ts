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
  width = 320;
  height = 460;
  top = 0;
  left = 0;

  isResizing = false;
  lastMouseX = 0;
  lastMouseY = 0;

  display = '0';
  keys = ['7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+',
    'C'];

  @ViewChild('calcBox') calcBox!: ElementRef;

  ngAfterViewInit(): void {
    if (this.isOpen) this.centerCalculator();
  }

  openCalculator() {
    this.isOpen = true;
    setTimeout(() => this.centerCalculator());
  }

  centerCalculator() {
    this.left = (window.innerWidth - this.width) / 2;
    this.top = (window.innerHeight - this.height) / 2;
  }

  startResizing(event: MouseEvent) {
    this.isResizing = true;
    this.lastMouseX = event.clientX;
    this.lastMouseY = event.clientY;
    event.preventDefault();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isResizing) return;
    const dx = event.clientX - this.lastMouseX;
    const dy = event.clientY - this.lastMouseY;
    this.width = Math.max(280, this.width + dx);
    this.height = Math.max(460, this.height + dy);
    this.lastMouseX = event.clientX;
    this.lastMouseY = event.clientY;
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.isResizing = false;
  }

  isOperator(key: string): boolean {
    return ['+', '-', '*', '/', '='].includes(key);
  }

  pressKey(key: string) {
    if (key === 'C') {
      this.display = '0';
    } else if (key === '=') {
      try {
        this.display = eval(this.display).toString();
      } catch {
        this.display = 'Error';
      }
    } else {
      if (this.display === '0' && key !== '.') {
        this.display = key;
      } else {
        this.display += key;
      }
    }
  }
}
