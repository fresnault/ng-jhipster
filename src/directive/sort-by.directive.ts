/*
 Copyright 2013-2017 the original author or authors from the JHipster project.

 This file is part of the JHipster project, see https://jhipster.github.io/
 for more information.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */
import { Directive, Host, HostListener, Input, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { JhiSortDirective } from './sort.directive';
import { JhiConfigService } from '../config.service';

@Directive({
    selector: '[jhiSortBy]'
})
export class JhiSortByDirective implements AfterViewInit {

    @Input() jhiSortBy: string;

    activeClass = 'active';

    jhiSort: JhiSortDirective;

    constructor(@Host() jhiSort: JhiSortDirective, private el: ElementRef, private renderer: Renderer2, configService: JhiConfigService) {
        this.jhiSort = jhiSort;
        const config = configService.getConfig();
        this.activeClass = config.activeClass;
    }

    ngAfterViewInit(): void {
        if (this.jhiSort.predicate && this.jhiSort.predicate !== '_score' && this.jhiSort.predicate === this.jhiSortBy) {
            this.applyClass();
        }
    }

    @HostListener('click') onClick() {
        if (this.jhiSort.predicate && this.jhiSort.predicate !== '_score') {
            this.jhiSort.sort(this.jhiSortBy);
            this.applyClass();
        }
    }

    private applyClass() {
        const sortIcons = this.el.nativeElement.children[1];
        this.renderer.removeClass(sortIcons.children[0], this.activeClass);
        if (this.jhiSort.ascending) {
            this.renderer.addClass(sortIcons.children[1], this.activeClass);
        } else {
            this.renderer.addClass(sortIcons.children[2], this.activeClass);
        }
    };
}
