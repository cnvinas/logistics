import { HttpClient, HttpClientModule } from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute, Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from "./app.component";

describe("AppComponent", () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  const RouterSpy = jasmine.createSpyObj("Router", ["navigate"]);
  const activatedRouteStub = ({
    snapshot: { params: {} },
  } as any) as ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientModule, RouterTestingModule],
      providers: [
        HttpClient,
        {
          provide: ActivatedRoute,
          useValue: activatedRouteStub,
        },
        { provide: Router, useValue: RouterSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it("should create AppComponent", () => {
    expect(component).toBeTruthy();
  });

  it("should have title logistics", () => {
    expect(component.title).toEqual("logistics");
  });
});
