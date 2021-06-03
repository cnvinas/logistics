import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute, Router } from "@angular/router";
import { AppComponent } from "src/app/main/app.component";
import { HomeComponent } from "./home.component";

describe("HomeComponent", () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const RouterSpy = jasmine.createSpyObj("Router", ["navigate"]);
  const activatedRouteStub = ({
    snapshot: { params: {} },
  } as any) as ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, HomeComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRouteStub,
        },
        { provide: Router, useValue: RouterSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create home component", () => {
    expect(component).toBeTruthy();
  });
});
