using com.capproject as db from '../db/modules/modules';

service DashboardService {

    entity Modules as projection on db.Modules;
}