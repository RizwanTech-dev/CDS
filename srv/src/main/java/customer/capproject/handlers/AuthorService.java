package customer.capproject.handlers;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.sap.cds.Result;
import com.sap.cds.reflect.CdsService;
import com.sap.cds.services.ErrorStatuses;
import com.sap.cds.services.ServiceException;
import com.sap.cds.services.cds.CdsCreateEventContext;
import com.sap.cds.services.cds.CdsReadEventContext;
import com.sap.cds.services.cds.CqnService;
import com.sap.cds.services.handler.EventHandler;
import com.sap.cds.services.handler.annotations.After;
import com.sap.cds.services.handler.annotations.Before;
import com.sap.cds.services.handler.annotations.ServiceName;

import cds.gen.authorservice.AuthorService_;
import cds.gen.authorservice.Authors_;

@Component
@ServiceName(AuthorService_.CDS_NAME)
public class AuthorService implements EventHandler {

    @After(event = CqnService.EVENT_READ, entity = "AuthorService.Authors")
    public void afterRead(CdsReadEventContext context) {

        Result result = context.getResult();

        for (Map<String, Object> row : result) {

            String name = (String) row.get("name");

            boolean hide = (name == null || name.trim().isEmpty());

            row.put("hideAge", hide);
        }
    }

    @Before(event = CqnService.EVENT_CREATE, entity = Authors_.CDS_NAME)
    public void beforeCreateAuthor(CdsCreateEventContext context) {

        System.out.println("Before handler triggered ✅");

        context.getCqn().entries().forEach(e -> {
            Object authorName = e.get("name");

            if (authorName == null) {
                throw new ServiceException(
                        ErrorStatuses.BAD_REQUEST,
                        "Author name is mandatory");
            }
        });
    }
}