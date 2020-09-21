package HotelApp.wSocket;

import org.springframework.stereotype.Component;

import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.ArrayList;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
@Component
@ServerEndpoint("/endpoint")
public class WSocketEndpoint {
    static ArrayList<Session> sessions = new ArrayList<Session>();
    /**
     * @param session
     */
    @OnOpen
    public void onOpen(Session session) {
        sessions.add(session);
        System.out.println("Successful connection");
    }

    /**
     * @param session
     */
    @OnClose
    public void onClose(Session session) {
        System.out.println("Connection closure");
    }

    /**
     * @param text
     */
    @OnMessage
    public String onMsg(String text) throws IOException {
        return "server: " + text;
    }

    public static void broadcastMessage(String message) {
        String sv = "\"message\":\"" + message +"\"";
        for(Session session : sessions) {
            if(session.isOpen()){
                try {
                    session.getBasicRemote().sendText(sv);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

        }
    }
}