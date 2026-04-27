namespace com.capproject.projects;

using { cuid ,managed} from '@sap/cds/common';

entity Projects : cuid ,managed{
    project_name : String;

    billing_plan : Composition of many BillingPlans on billing_plan.projects = $self;
}

entity BillingPlans : cuid {
    billing_plan_name : String;
    
    projects :Association to Projects;
}