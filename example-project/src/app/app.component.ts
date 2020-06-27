import {AfterViewInit, Component} from '@angular/core';
import {Angular2MaterializeV1Service} from 'angular2-materialize-v1';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';

// syntax highlighting
declare var Prism;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  public currentRoute: string;
  public title = 'example-project';
  public isGettingStartedActive: boolean;
  public isJavaScriptActive: boolean;
  private sidenavInstance: any;
  private collapsibleInstance: any;

  constructor(private router: Router, private angular2MaterializeService: Angular2MaterializeV1Service) {
    this.router.events
      .pipe(filter((evt) => evt instanceof NavigationEnd))
      .subscribe((evt: NavigationEnd) => {
        // syntax highlighting
        Prism.highlightAll();

        this.currentRoute = evt.urlAfterRedirects;
        this.isGettingStartedActive = this.currentRoute === '/project-setup'
          || this.currentRoute === '/using-angular2-materialize-v1';

        this.isJavaScriptActive = this.currentRoute !== '/project-setup'
          && this.currentRoute !== '/using-angular2-materialize-v1'
          && this.currentRoute !== '/about'
          && this.currentRoute !== '/donate';

        if (this.isGettingStartedActive) {
          this.collapsibleInstance.open(0);
        }
        else if (this.isJavaScriptActive) {
          this.collapsibleInstance.open(1);
        }
        else {
          this.collapsibleInstance.close(0);
          this.collapsibleInstance.close(1);
        }
      });
  }

  public ngAfterViewInit() {
    this.sidenavInstance = this.angular2MaterializeService.initSidenav('.sidenav');
    this.collapsibleInstance = this.angular2MaterializeService.initCollapsible('.collapsible')[0];
  }
}
